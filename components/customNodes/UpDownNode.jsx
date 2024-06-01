import { Handle, Position } from 'reactflow';

function UpDownNode({ data, isConnectable }) {
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
				position={Position.Bottom}
				id="b"
				isConnectable={isConnectable}
			/>
		</div>
	);
}

export default UpDownNode;
