import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Users, User, Clock, Plus, Trash2, Edit, ZoomIn, ZoomOut, RotateCcw, Move3D, Link } from 'lucide-react';

const FlowChart = () => {
  const [nodes, setNodes] = useState([
    { id: "1", type: 'group', threshold: 2, total: 3, children: [], x: 0, y: 0 }
  ]);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  // contextMenuType: 'node' | 'editor'
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null, type: '' });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [autoLayout, setAutoLayout] = useState(true);
  const [draggingNode, setDraggingNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [linkMode, setLinkMode] = useState(false);

  const containerRef = useRef(null);
  const nextId = useRef(2);

  // Simple tree layout function
  const layoutTree = useCallback((nodes: any[]) => {
    if (!autoLayout) return nodes;

    const LEVEL_GAP_Y = 120;
    const SIBLING_GAP_X = 160;

    const roots = nodes.filter((n: { id: any; }) => !nodes.some((p: { children: any; }) => (p.children || []).includes(n.id)));

    let currentX = 0;

    const assignPositions = (nodeId: any, depth: number) => {
      const node = nodes.find((n: { id: any; }) => n.id === nodeId);
      if (!node) return;

      if (node.children && node.children.length > 0) {
        node.children.forEach((childId: any) => assignPositions(childId, depth + 1));
        const childXs = node.children.map((cid: any) => nodes.find((n: { id: any; }) => n.id === cid)?.x || 0);
        node.x = childXs.reduce((a: any, b: any) => a + b, 0) / childXs.length;
      } else {
        node.x = currentX;
        currentX += SIBLING_GAP_X;
      }
      node.y = depth * LEVEL_GAP_Y;
    };

    roots.forEach((root: { id: any; }) => assignPositions(root.id, 0));
    return [...nodes];
  }, [autoLayout]);

  const addNode = useCallback((type: string, parentId = null) => {
    const newNode = {
      id: String(nextId.current++),
      type,
      threshold: type === 'group' ? 2 : undefined,
      total: type === 'group' ? 3 : undefined,
      children: [],
      x: 0,
      y: 0
    };

    setNodes((prev: any) => {
      let updated = [...prev, newNode];
      if (parentId) {
        updated = updated.map(n => n.id === parentId ? { ...n, children: [...n.children, newNode.id] } : n);
      }
      return layoutTree(updated);
    });
  }, [layoutTree]);

  const deleteNode = useCallback((nodeId: any) => {
    setNodes((prev: any[]) => {
      let updated = prev.filter((n: { id: any; }) => n.id !== nodeId);
      updated = updated.map((n: { children: any[]; }) => ({ ...n, children: n.children.filter((cid: any) => cid !== nodeId) }));
      return layoutTree(updated);
    });
    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null });
  }, [layoutTree]);

  useEffect(() => {
    setNodes((prev: any) => layoutTree([...prev]));
  }, [layoutTree]);

  const worldToScreen = useCallback((x: number, y: number) => ({ x: x * zoom + pan.x + 300, y: y * zoom + pan.y + 100 }), [zoom, pan]);
  const screenToWorld = useCallback((x: number, y: number) => ({ x: (x - pan.x - 300) / zoom, y: (y - pan.y - 100) / zoom }), [zoom, pan]);

  // Zoom functions
  const handleZoom = useCallback((direction: number) => {
    const zoomFactor = direction > 0 ? 1.2 : 0.8;
    setZoom((prev: number) => Math.max(0.1, Math.min(3, prev * zoomFactor)));
  }, []);

  const handleWheel = useCallback((e: { ctrlKey: any; metaKey: any; preventDefault: () => void; deltaY: number; }) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      handleZoom(-e.deltaY);
    }
  }, [handleZoom]);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = (e: { button: number; clientX: number; clientY: number; preventDefault: () => void; }) => {
    if (e.button === 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    } else if (draggingNode && !autoLayout) {
      const { x, y } = screenToWorld(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      setNodes((prev: any[]) => prev.map((n: { id: any; }) => n.id === draggingNode ? { ...n, x, y } : n));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNode(null);
  };

  const renderGrid = () => {
    if (!showGrid) return null;
    const gridSize = 40;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const lines = [];
    for (let x = -pan.x % (gridSize * zoom); x < width; x += gridSize * zoom) {
      lines.push(<line key={`v-${x}`} x1={x} y1={0} x2={x} y2={height} stroke="#e4e8f0ff" strokeWidth="0.5" opacity="0.3" />);
    }
    for (let y = -pan.y % (gridSize * zoom); y < height; y += gridSize * zoom) {
      lines.push(<line key={`h-${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#374151" strokeWidth="0.5" opacity="0.3" />);
    }
    return lines;
  };

  const renderNode = (node: { x: any; y: any; type: string; id: any; threshold: any; total: any; }) => {
    const screenPos = worldToScreen(node.x, node.y);
    let icon, color;
    switch (node.type) {
      case 'group': icon = <Users size={16}/>; color = 'bg-orange-500'; break;
      case 'signer': icon = <User size={16}/>; color = 'bg-blue-500'; break;
      case 'timelock': icon = <Clock size={16}/>; color = 'bg-green-500'; break;
      default: icon = <Users size={16}/>; color = 'bg-gray-500';
    }
    return (
      <div key={node.id}>
        <div
          onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setContextMenu({ visible: true, x: e.clientX, y: e.clientY, nodeId: node.id, type: 'node' });
          }}
          onMouseDown={(e: { button: number; clientX: number; clientY: number; stopPropagation: () => void; }) => {
            if (e.button === 0 && !autoLayout) {
              const nodePos = worldToScreen(node.x, node.y);
              setDraggingNode(node.id);
              setDragOffset({ x: e.clientX - nodePos.x, y: e.clientY - nodePos.y });
              e.stopPropagation();
            }
          }}
          className={`absolute px-4 py-2 rounded text-white shadow cursor-pointer ${color}`}
          style={{left: screenPos.x, top: screenPos.y, transform: 'translate(-50%,-50%)'}}
        >
          <div className="flex items-center gap-2">
            {icon}
            {node.type === 'group' ? `${node.threshold} of ${node.total}` : node.type}
          </div>
        </div>
        {/* + button below node */}
        <div
          className="absolute w-6 h-6 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center cursor-pointer shadow-md"
          style={{ left: screenPos.x, top: screenPos.y + 40, transform: 'translate(-50%, -50%)' }}
          onClick={() => addNode('signer', node.id)}
        >
          <Plus size={12} className="text-white" />
        </div>
        {/* Link lines if linkMode */}
        {linkMode && (
          <>
            {/* Left link */}
            <div className="absolute bg-green-400" style={{ left: screenPos.x - 50, top: screenPos.y, width: '20px', height: '2px' }}/>
            {/* Right link */}
            <div className="absolute bg-green-400" style={{ left: screenPos.x + 30, top: screenPos.y, width: '20px', height: '2px' }}/>
            {/* Top link */}
            <div className="absolute bg-green-400" style={{ left: screenPos.x, top: screenPos.y - 30, width: '2px', height: '20px' }}/>
          </>
        )}
      </div>
    );
  };

  const renderConnections = () => {
    const paths: any[] = [];
    nodes.forEach((node: { children: any[]; x: any; y: any; id: any; }) => {
      node.children.forEach((cid: any) => {
        const child = nodes.find((n: { id: any; }) => n.id === cid);
        if (child) {
          const p = worldToScreen(node.x, node.y);
          const c = worldToScreen(child.x, child.y);
          const midY = (p.y + c.y)/2;
          paths.push(<path key={`${node.id}-${cid}`} d={`M${p.x},${p.y} C${p.x},${midY} ${c.x},${midY} ${c.x},${c.y}`} stroke="#10B981" strokeWidth="2" fill="none"/>);
        }
      });
    });
    return paths;
  };

  return (
    <div 
      className="w-full h-screen bg-gray-900 overflow-hidden relative" 
      ref={containerRef} 
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
        // Nếu click vào vùng trống, hiện context menu editor
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY, nodeId: null, type: 'editor' });
      }}
      style={{ cursor: isPanning ? 'grabbing' : draggingNode ? 'grabbing' : 'default' }}
    >
      {/* Toolbar */}
      <div className="absolute top-4 left-4 bg-gray-800 text-white p-2 rounded-lg shadow-lg z-50 flex gap-2">
        <button onClick={() => addNode('signer')} className="p-2 hover:bg-gray-700 rounded" title="Add Signer Node"><User size={16} /></button>
        <button onClick={() => addNode('group')} className="p-2 hover:bg-gray-700 rounded" title="Add Group Node"><Users size={16} /></button>
        <button onClick={() => addNode('timelock')} className="p-2 hover:bg-gray-700 rounded" title="Add Timelock Node"><Clock size={16} /></button>
        <div className="w-px bg-gray-600"></div>
        <button onClick={() => handleZoom(1)} className="p-2 hover:bg-gray-700 rounded" title="Zoom In"><ZoomIn size={16} /></button>
        <button onClick={() => handleZoom(-1)} className="p-2 hover:bg-gray-700 rounded" title="Zoom Out"><ZoomOut size={16} /></button>
        <button onClick={resetView} className="p-2 hover:bg-gray-700 rounded" title="Reset View"><RotateCcw size={16} /></button>
        <div className="w-px bg-gray-600"></div>
        <button onClick={() => setAutoLayout((prev: any) => !prev)} className={`p-2 rounded ${autoLayout ? 'bg-orange-500' : 'bg-gray-700 hover:bg-gray-600'}`} title="Toggle Auto Layout"><Move3D size={16} /></button>
        <button onClick={() => setShowGrid((prev: any) => !prev)} className={`p-2 rounded ${showGrid ? 'bg-orange-500' : 'bg-gray-700 hover:bg-gray-600'}`} title="Toggle Grid"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16M4 12h16M4 20h16M12 4v16"/></svg></button>
        <button onClick={() => setLinkMode((prev: any) => !prev)} className={`p-2 rounded ${linkMode ? 'bg-orange-500' : 'bg-gray-700 hover:bg-gray-600'}`} title="Toggle Link Mode"><Link size={16}/></button>
      </div>

      {/* Info panel */}
      <div className="absolute top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-40 text-sm">
        <div className="mb-2 font-semibold">Multi-sig Editor</div>
        <div className="space-y-1 text-xs text-gray-300">
          <div>• Click + at end of lines to add children</div>
          <div>• Right-click for context menu</div>
          <div>• Middle mouse drag to pan</div>
          <div>• Toggle auto-layout to allow manual drag</div>
          <div>• Toggle grid background</div>
          <div>• Toggle link mode to show connection lines</div>
          <div>Zoom: {Math.round(zoom * 100)}%</div>
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {renderGrid()}
        {renderConnections()}
      </svg>

      <div className="absolute inset-0 z-20">
        {nodes.map(renderNode)}
      </div>

      {contextMenu.visible && (
        contextMenu.type === 'node' ? (
          <div
            className="fixed bg-gray-800 text-white rounded shadow-lg p-2 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full" onClick={() => addNode('signer', contextMenu.nodeId)}>
              <User size={14}/> Add Participant
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full" onClick={() => addNode('timelock', contextMenu.nodeId)}>
              <Clock size={14}/> Add Timelock
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full" onClick={() => addNode('group', contextMenu.nodeId)}>
              <Users size={14}/> Add New Group
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full" onClick={() => deleteNode(contextMenu.nodeId)}>
              <Trash2 size={14}/> Delete
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full">
              <Edit size={14}/> Edit
            </button>
            <button className="flex items-center gap-2 px-2 py-1 text-red-400 hover:bg-gray-700 w-full" onClick={() => setContextMenu({ visible: false, x: 0, y: 0, nodeId: null, type: '' })}>
              Close
            </button>
          </div>
        ) : (
          <div
            className="fixed bg-gray-800 text-white rounded shadow-lg p-2 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full" onClick={() => { addNode('group'); setContextMenu({ visible: false, x: 0, y: 0, nodeId: null, type: '' }); }}>
              <Users size={14}/> Add Group
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full" onClick={() => { addNode('signer'); setContextMenu({ visible: false, x: 0, y: 0, nodeId: null, type: '' }); }}>
              <User size={14}/> Add Participant
            </button>
            <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 w-full" onClick={() => { addNode('timelock'); setContextMenu({ visible: false, x: 0, y: 0, nodeId: null, type: '' }); }}>
              <Clock size={14}/> Add Timelock
            </button>
            <button className="flex items-center gap-2 px-2 py-1 text-red-400 hover:bg-gray-700 w-full" onClick={() => setContextMenu({ visible: false, x: 0, y: 0, nodeId: null, type: '' })}>
              Close
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default FlowChart;
