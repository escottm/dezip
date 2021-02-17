import Convert from 'xml-js'
import { ZIP } from './constants#nocommit'

//  initialize logger
//  **comment out** the next 2 lines if you don't have "clog"
//import {clog} from '../clog'
//clog( null, 'ZIP');

// uncomment the next line if you have "clog"
const clog = (...stuff: any[]) => console.log(stuff);

export const ZIP5_PATTERN = /^(\d\d\d\d\d)$/;

//  requires a USPS USERID and URI, supplied here by importing ./constants#nocommit
const zipApiZip5 = ( zip: string ) => '<Zip5>' + zip + '</Zip5>';
const zipApiQvars = ( zip: string) => 
  'API=CityStateLookup&'+
  `XML=<CityStateLookupRequest USERID="${ZIP.ZIP_API_ID}">`+
        `<ZipCode ID='0'>${zipApiZip5(zip)}</ZipCode>`+
      '</CityStateLookupRequest>'
const zipApiUrl = ( zip:string ) => `${ZIP.ZIP_API_BASEURL}?${zipApiQvars( zip )}`

interface zipResponse {
    CityStateLookupResponse: {
      ZipCode: {
        ID: {_text: string};
        Zip5: {_text: string};
        City: {_text: string};
        State: {_text: string}
        Error?: {
          Description: {_text: string}
        }
      }
    }
  }

export interface cityState {city: string, state: string, error?: string };

export async function deZip( zip: string ): Promise<cityState> {
  const url = zipApiUrl( zip );
  if ( !url ) {
    clog('!!Error: no API. Is the .env file missing?' );
    return( {city: 'no_api', state: 'no_api'})
  }
  const fetchOpts = {
    method: 'GET', 
    headers: {
      'Content-Type': 'text/plain'
    }, 
    mode: "cors" as RequestMode
  }

  const result = await fetch( url, fetchOpts);
  const xmlResponse = await result.text();
  if ( !xmlResponse ) {
    clog('Error: no xmlResponse' );
    return( {city: 'not_found', state: 'not_found'})
  }
  clog( 'xmlResponse:\n'+xmlResponse );
  const response = Convert.xml2js(xmlResponse, {compact: true}) as zipResponse;
  clog( 'Response: \n' + JSON.stringify( response ) );
  const zErr = response.CityStateLookupResponse.ZipCode.Error;
  if ( zErr ) {
    clog( '!!Error: ' + zErr.Description._text );
    return( {city:'', state:'', error: zErr.Description._text } )
  }
  return(  {city: response.CityStateLookupResponse.ZipCode.City._text, 
          state: response.CityStateLookupResponse.ZipCode.State._text } )
}
