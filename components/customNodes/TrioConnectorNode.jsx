import { Handle, Position } from 'reactflow';

const handleSourceStyle = { left: '100%' };
const handleTargetStyle = { top: '0%' };

function Trio({ data }) {
	return (
		<div className="min-h-full">
			<div className="flex items-center justify-center h-[75px]">
				<p>{data.label}</p>
			</div>
			<Handle
				id="a"
				type="target"
				style={{ top: -1 }}
				position={Position.Top}
			/>
			<Handle
				id="b"
				type="source"
				style={{ bottom: -1 }}
				position={Position.Bottom}
			/>
			<Handle
				id="c"
				type="source"
				style={{ right: -1 }}
				position={Position.Right}
			/>
		</div>
	);
}

export default Trio;
