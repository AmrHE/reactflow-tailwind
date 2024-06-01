import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
	ReactFlowProvider,
	addEdge,
	useNodesState,
	useEdgesState,
	Controls,
	Background,
	Panel,
	MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import UpDownNode from './customNodes/UpDownNode';
import CustomInputNode from './customNodes/CustomInputNode';
import CustomOutputNode from './customNodes/CustomOutputNode';
import TrioConnectorNode from './customNodes/TrioConnectorNode';
import TopLeftNode from './customNodes/TopLeftNode';
import LeftBottomNode from './customNodes/LeftBottomNode';
import RightLeftNode from './customNodes/RightLeftNode';

const nodeTypes = {
	'Up-Down': UpDownNode,
	'Top-Left': TopLeftNode,
	'Left-Bottom': LeftBottomNode,
	'Right-Left': RightLeftNode,
	'Custom-Input': CustomInputNode,
	'Custom-Output': CustomOutputNode,
	Trio: TrioConnectorNode,
};
const initialNodes = [
	{
		id: '1',
		type: 'Up-Down',
		data: { label: 'Up-Down Node' },
		position: { x: 250, y: 5 },
		style: { backgroundColor: '#1E80FF', color: 'white' },
	},
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Diagram = () => {
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [editValue, setEditValue] = useState(nodes.data);
	const [id, setId] = useState();
	const [isEditing, setIsEditing] = useState(false);
	const [variant, setVariant] = useState('dots');

	const onNodeClick = (e, value) => {
		setEditValue(value.data.label);
		setId(value.id);
		setIsEditing(true);
	};

	const handleChange = (e, value) => {
		// e.preventDefault();
		setEditValue(e.target.value);
	};

	const onUpdateClick = () => {
		const res = nodes.map((item) => {
			if (item.id === id) {
				item.data = {
					...item.data,
					label: editValue,
				};
			}
			return item;
		});

		setNodes(res);
		setIsEditing(false);
	};

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[]
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();

			const type = event.dataTransfer.getData('application/reactflow');

			if (typeof type === 'undefined' || !type) {
				return;
			}

			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: getId(),
				type,
				position,
				data: { label: `${type} node` },
				style: {
					backgroundColor:
						type === 'Custom-Input'
							? '#CE2C91'
							: type === 'Custom-Output'
							? '#CE2C91'
							: type === 'Up-Down'
							? '#1E80FF'
							: type === 'Right-Left'
							? '#1E80FF'
							: type === 'Top-Left'
							? '#1E80FF'
							: type === 'Left-Bottom'
							? '#1E80FF'
							: '#F48500',
					color: 'white',
				},
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance]
	);

	const nodeColor = (node) => {
		switch (node.type) {
			case 'Custom-Input':
				return '#CE2C91';
			case 'Custom-Output':
				return '#CE2C91';
			case 'Up-Down':
				return '#1E80FF';
			case 'Right-Left':
				return '#1E80FF';
			case 'Top-Left':
				return '#1E80FF';
			case 'Left-Bottom':
				return '#1E80FF';
			case 'Trio':
				return '#F48500';

			default:
				return;
		}
	};

	return (
		<div className="dndflow">
			<ReactFlowProvider>
				<Sidebar />
				<div className="reactflow-wrapper" ref={reactFlowWrapper}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodeClick={(e, val) => onNodeClick(e, val)}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						onInit={setReactFlowInstance}
						onDrop={onDrop}
						onDragOver={onDragOver}
						fitView
						nodeTypes={nodeTypes}
					>
						<Background
							color="#999"
							variant={variant}
							size={variant === 'dots' ? '1.5' : null}
						/>

						<Panel>
							<div className="mx-3 my-2 text-xl font-bold capitalize">
								variant:
							</div>
							<button
								className="px-2 mx-2 capitalize border border-gray-300 border-solid bg-slate-100"
								onClick={() => setVariant('dots')}
							>
								dots
							</button>
							<button
								className="px-2 mx-2 capitalize border border-gray-300 border-solid bg-slate-100"
								onClick={() => setVariant('lines')}
							>
								lines
							</button>
							<button
								className="px-2 mx-2 capitalize border border-gray-300 border-solid bg-slate-100"
								onClick={() => setVariant('cross')}
							>
								cross
							</button>
						</Panel>

						<Controls />

						<MiniMap
							nodeColor={nodeColor}
							nodeStrokeWidth={3}
							zoomable
							pannable
						/>
					</ReactFlow>
				</div>
			</ReactFlowProvider>

			{isEditing && (
				<div className="w-[12%] p-5 shadow-lg bg-slate-50">
					<label className="font-semibold">Label: </label>
					<br />
					<input
						type="text"
						value={editValue}
						onChange={handleChange}
						className="py-1 pl-2 mt-4 border border-gray-300 border-solid rounded-md shadow-sm outline-none focus:outline-none"
					/>
					<br />
					<div className="flex justify-between my-5">
						<button
							onClick={onUpdateClick}
							className="px-3 py-1 bg-yellow-200 rounded-md shadow-sm cursor-pointer"
						>
							Update
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="px-3 py-1 bg-yellow-200 rounded-md shadow-sm cursor-pointer"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Diagram;
