import React from 'react';
import { useState } from 'react';

import "./style.scss";

const SwitchTabs = ({data, onTabChange}) => {

	const [selectedTab, setSelectedTab] = useState (0);
	const [left, setLeft] = useState (0);

	const activeTab = (tab, index) => {
		setLeft (index * 100);
		setTimeout(() => {
			setSelectedTab (index);
		}, 300);

		onTabChange (tab, index);
	}

	return (
		<div className = "switching-tabs">
			<div className="tab-items">
				{data.map ((tabName, index) => (
					<span
						key = {index} 
						className = {`tab-item ${selectedTab === index ? "active": ""
						}`}
						onClick={() => activeTab (tabName, index)}
					>
						{tabName}
					</span>
				))}

				<span className="moving-bg" style = {{ left }} />
			</div>
		</div>
	)
}

export default SwitchTabs
