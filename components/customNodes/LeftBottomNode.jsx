import { Handle, Position } from 'reactflow';

function LeftBottomNode({ data, isConnectable }) {
	return (
		<div>
			<div className="">{data.label}</div>
			<Handle
				type="target"
				id="a"
				position={Position.Left}
				isConnectable={isConnectable}
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

export default LeftBottomNode;
