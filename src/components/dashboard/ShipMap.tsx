import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fleetData } from '../../services/mockData';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export function ShipMap() {
    return (
        <div className="card overflow-hidden h-[500px]">
            <div className="h-full w-full bg-slate-50">
                <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    {fleetData.map((ship) => (
                        <Marker key={ship.id} position={[ship.lat, ship.lng]}>
                            <Popup className="custom-popup">
                                <div className="p-1">
                                    <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                                        <div className={`h-2 w-2 rounded-full ${ship.status === 'Laden' ? 'bg-emerald-500' :
                                            ship.status === 'Ballast' ? 'bg-sky-500' : 'bg-amber-500'
                                            }`} />
                                        <h3 className="font-bold text-slate-900">{ship.name}</h3>
                                    </div>
                                    <div className="space-y-1 text-xs text-slate-600">
                                        <p><span className="font-medium text-slate-400">Type:</span> {ship.type}</p>
                                        <p><span className="font-medium text-slate-400">Dest:</span> {ship.destination}</p>
                                        <p><span className="font-medium text-slate-400">ETA:</span> {ship.eta}</p>
                                        {ship.qty !== 'N/A' && <p><span className="font-medium text-slate-400">Cargo:</span> {ship.qty}</p>}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
