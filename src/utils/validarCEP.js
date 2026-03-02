import * as turf from '@turf/turf';

export function pontoDentroDoPoligono(latitude, longitude, poligono) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return false;
  }

  const ponto = turf.point([lng, lat]);
  const area = turf.polygon(poligono.coordinates);

  return turf.booleanPointInPolygon(ponto, area);
}