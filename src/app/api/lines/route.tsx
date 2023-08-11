import { lines } from './lines'
import { NextResponse, NextRequest} from 'next/server'

type Stations = Record<string, string[]>

const addStations = (stations: Stations, station: string, line : string) => {
  if (!stations[station]){
    stations[station] = [];
  }
  stations[station].push(line);
}

export async function POST(request: NextRequest) {
  
  const body = await request.json();
  const search: string = body.search;
  let stations: Stations = {};

  if (!search){
    return NextResponse.json({message: "Empty search"});
  }

  for(const line in lines){
    lines[line].forEach(station => {
      station.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ? addStations(stations, station, line) : null;
    });
  }

  return NextResponse.json({stations});
}