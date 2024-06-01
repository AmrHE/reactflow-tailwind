import { Handle, Position } from 'reactflow';

function RightLeftNode({ data, isConnectable }) {
	return (
		<div>
			<div className="">{data.label}</div>
			<Handle
				type="target"
				position={Position.Left}
				isConnectable={isConnectable}
				id="a"
			/>
			<Handle
				type="source"
				position={Position.Right}
				id="b"
				isConnectable={isConnectable}
			/>
		</div>
	);
}

export default RightLeftNode;
