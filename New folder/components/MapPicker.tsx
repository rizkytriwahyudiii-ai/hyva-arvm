'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface MapPickerProps {
  onClose: () => void;
  onConfirm: (data: {
    lat: number;
    lng: number;
    province: string;
    city: string;
    district: string;
    village: string;
    postalCode: string;
    fullAddress: string;
  }) => void;
}

export default function MapPicker({ onClose, onConfirm }: MapPickerProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [locData, setLocData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      if (!mapDivRef.current || mapRef.current) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapDivRef.current).setView([-7.2575, 112.7521], 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);

      const marker = L.marker([-7.2575, 112.7521], { draggable: true }).addTo(map);
      markerRef.current = marker;

      const doGeocode = async (lat: number, lng: number) => {
        setLoading(true);
        try {
          const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id&addressdetails=1`);

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const geoData = await res.json();

            const a = geoData.address || {};

          const result = {
            lat,
            lng,

            province:
              a.state ||
              a.province ||
              '',

            city:
              a.city ||
              a.regency ||
              a.county ||
              a.town ||
              '',

            district:
              a.city_district ||
              a.municipality ||
              a.suburb ||
              a.district ||
              a.borough ||
              a.quarter ||
              a.city_area ||
              '',

            village:
              a.village ||
              a.neighbourhood ||
              a.hamlet ||
              a.residential ||
              a.suburb ||
              a.quarter ||
              a.city_district ||
              '',

            postalCode:
              a.postcode || '',

            fullAddress:
              geoData.display_name || '',
          };
          setLocData(result);
        } catch (error) {
          console.error('[mapPicker geocode error]:', error);
          toast.error('Gagal memuat data lokasi');
          setLocData(null);
        } finally {
          setLoading(false);
        }
      };

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        doGeocode(pos.lat, pos.lng);
      });

      map.on('click', (e: any) => {
      marker.setLatLng(e.latlng);
      map.setView(e.latlng, 17); // zoom in lebih dekat
      doGeocode(e.latlng.lat, e.latlng.lng);
    });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          map.setView([latitude, longitude], 15);
          marker.setLatLng([latitude, longitude]);
          doGeocode(latitude, longitude);
        });
      } else {
        doGeocode(-7.2575, 112.7521);
      }
    });

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white w-full max-w-xl rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-700">
            Pilih Titik Lokasi
          </p>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={18} />
          </button>
        </div>

        <div ref={mapDivRef} style={{ height: '300px', width: '100%' }} />

        <div className="px-6 py-4 border-t border-gray-100">
          {loading && (
            <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-3">
              <Loader2 size={13} className="animate-spin" /> Mendeteksi alamat...
            </div>
          )}
          {locData && !loading && (
            <div className="bg-gray-50 p-3 mb-3 space-y-1">
              {locData.province && <p className="text-[11px] text-gray-600"><span className="text-gray-400">Provinsi:</span> {locData.province}</p>}
              {locData.city && <p className="text-[11px] text-gray-600"><span className="text-gray-400">Kota/Kab:</span> {locData.city}</p>}
              {locData.district && <p className="text-[11px] text-gray-600"><span className="text-gray-400">Kecamatan:</span> {locData.district}</p>}
              {locData.village && <p className="text-[11px] text-gray-600"><span className="text-gray-400">Desa/Kel:</span> {locData.village}</p>}
              {locData.postalCode && <p className="text-[11px] text-gray-600"><span className="text-gray-400">Kode Pos:</span> {locData.postalCode}</p>}
            </div>
          )}
          {!locData && !loading && (
            <p className="text-[11px] text-gray-400 mb-3">Klik peta atau geser pin untuk mendeteksi lokasi.</p>
          )}
          <button
            onClick={() => locData && onConfirm(locData)}
            disabled={!locData || loading}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
          >
            Konfirmasi Lokasi
          </button>
        </div>
      </div>
    </div>
  );
}