import { Handle, Position } from 'reactflow';

function CustomOutput({ data }) {
	return (
		<div>
			<div>{data.label}</div>
			<Handle type="target" position={Position.Top} />
		</div>
	);
}

export default CustomOutput;
