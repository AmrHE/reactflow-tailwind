import { Handle, Position } from 'reactflow';

function TopLeftNode({ data, isConnectable }) {
	return (
		<div>
			<div className="">{data.label}</div>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
				id="a"
			/>
			<Handle
				type="source"
				position={Position.Left}
				id="b"
				isConnectable={isConnectable}
			/>
		</div>
	);
}

export default TopLeftNode;
