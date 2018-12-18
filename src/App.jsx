import React from "react";

import fetch from "unfetch";

class App extends React.Component {
	state = {
		error: false,
		loading: true,
		stations: []
	};

	async componentDidMount() {
		const [stationsResponse, availabilityResponse] = await Promise.all([
			fetch("/oslobysykkel/stations"),
			fetch("/oslobysykkel/stations/availability")
		]);

		if (!stationsResponse.ok || !availabilityResponse.ok) {
			this.setState({ error: true });
			return;
		}

		try {
			const { stations } = await stationsResponse.json();
			const { stations: availability } = await availabilityResponse.json();

			const availabilityMap = {};

			availability.forEach(station => {
				availabilityMap[station.id] = station.availability;
			});

			this.setState({
				loading: false,
				stations: stations.map(station => ({
					...station,
					availability: availabilityMap[station.id]
				}))
			});
		} catch {
			this.setState({ error: true });
		}
	}

	render() {
		const { error, stations, loading } = this.state;
		if (error) {
			return <p>Noe gikk galt. Forsøk å laste siden på nytt.</p>;
		}

		const stationListItems = stations.map(station => (
			<li>
				{station.title} ({station.subtitle}) [{station.availability.bikes}/
				{station.number_of_locks}]
			</li>
		));

		return (
			<div>
				<h2>Stativnavn (Beskrivelse) [ledig/totalt antall]</h2>
				{loading ? <p>Laster...</p> : <ul>{stationListItems}</ul>}
			</div>
		);
	}
}

export default App;
