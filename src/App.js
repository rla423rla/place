import React, { useState } from 'react';

function App() {
  const [places, setPlaces] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [searchBuilding, setSearchBuilding] = useState('');
  const [searchPlace, setSearchPlace] = useState('');

  const [searchField, setSearchField] = useState('building');

  const addPlace = (place) => {
    setPlaces([...places, place]);
    setNextNumber(nextNumber + 1);
  };

  const deletePlaces = () => {
    const newPlaces = places.filter(place => !place.selected);
    setPlaces(newPlaces);
  };

  const handleSearch = () => {
    if (searchBuilding !== '' && searchPlace !== '') {
      alert('Please select only one search field.');
    } else if (searchBuilding !== '') {
      // Search by building name
      const filteredPlaces = places.filter(place => place.buildingName.toLowerCase().includes(searchBuilding.toLowerCase()));
      setPlaces(filteredPlaces);
    } else if (searchPlace !== '') {
      // Search by place name
      const filteredPlaces = places.filter(place => place.placeName.toLowerCase().includes(searchPlace.toLowerCase()));
      setPlaces(filteredPlaces);
    } else {
      // No search criteria specified, show all places
      setPlaces(places);
    }
  };
  return (
    <div>
      <div className="search-container">
        <div>
          <h2>Search Places</h2>
          <label>
            <input type="radio" name="searchField" value="building" checked={searchField === 'building'} onChange={() => setSearchField('building')} />
            Building:
            <input type="text" value={searchBuilding} onChange={(e) => setSearchBuilding(e.target.value)} />
          </label>
          <label>
            <input type="radio" name="searchField" value="place" checked={searchField === 'place'} onChange={() => setSearchField('place')} />
            Place:
            <input type="text" value={searchPlace} onChange={(e) => setSearchPlace(e.target.value)} />
          </label>
          <br />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="actions-container">
        <button onClick={() => setShowAddPlaceModal(true)}>Add Place</button>
        <button onClick={deletePlaces}>Delete Place</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Number</th>
            <th>Classification</th>
            <th>Building Name</th>
            <th>Place Name</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place, index) => (
            <tr key={index}>
              <td><input type="checkbox" checked={place.selected} onChange={(e) => setPlaces([...places.slice(0, index), {...place, selected: e.target.checked}, ...places.slice(index+1)])} /></td>
              <td>{place.number}</td>
              <td>{place.classification}</td>
              <td>{place.buildingName}</td>
              <td>{place.placeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPlaceModal && (
        <div>
          <h2>Add Place</h2>
          <form onSubmit={(e) => { 
            e.preventDefault(); 
            addPlace({
              number: parseInt(e.target.elements.number.value), 
              classification: e.target.elements.classification.value, 
              buildingName: e.target.elements.buildingName.value, 
              placeName: e.target.elements.placeName.value, 
              selected: false
            }); 
            setShowAddPlaceModal(false); 
          }}>
            <label>
              Number:
              <input type="number" name="number" />
            </label>
            <br />
            <label>
              Classification:
              <select name="classification">
                <option value="building">Building</option>
                <option value="place">Place</option>
              </select>
            </label>
            <br />
            <label>
              Building Name:
              <input type="text" name="buildingName" />
            </label>
            <br />
            <label>
              Place Name:
              <input type="text" name="placeName" />
            </label>
            <br />
            <button type="submit">Add</button>
            <button onClick={() => setShowAddPlaceModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
