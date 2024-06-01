import { Handle, Position } from 'reactflow';

function CustomInputNode({ data }) {
	return (
		<div>
			<div>{data.label}</div>
			<Handle type="source" position={Position.Right} />
		</div>
	);
}

export default CustomInputNode;
