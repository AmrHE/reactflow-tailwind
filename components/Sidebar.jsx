import React from 'react';

const Sidebar = () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside>
			<div className="description">
				You can drag these nodes to the pane on the right.
			</div>
			<div
				className="dndnode input"
				onDragStart={(event) => onDragStart(event, 'Custom-Input')}
				draggable
			>
				Custom-Input Node
			</div>
			<div
				className="dndnode right-left"
				onDragStart={(event) => onDragStart(event, 'Right-Left')}
				draggable
			>
				Right-Left Node
			</div>
			<div
				className="dndnode up-down"
				onDragStart={(event) => onDragStart(event, 'Up-Down')}
				draggable
			>
				Up-Down Node
			</div>
			<div
				className="dndnode top-left"
				onDragStart={(event) => onDragStart(event, 'Top-Left')}
				draggable
			>
				Top-Left Node
			</div>
			<div
				className="dndnode left-bottom"
				onDragStart={(event) => onDragStart(event, 'Left-Bottom')}
				draggable
			>
				Left-Bottom Node
			</div>
			<div
				className="dndnode output"
				onDragStart={(event) => onDragStart(event, 'Custom-Output')}
				draggable
			>
				Custom-Output Node
			</div>
			<div
				className="dndnode trio"
				onDragStart={(event) => onDragStart(event, 'Trio')}
				draggable
			>
				Trio Node
			</div>
		</aside>
	);
};

export default Sidebar;
