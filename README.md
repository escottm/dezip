# deZip

*deZip* is an annoyingly simple way to spare your users from having to enter their city and state when you are **going to ask them for their ZIP code anyway**. 

As you can tell, this is kind of a UX pet peeve of mine.

The USPS API was apparently developed in the Roosevelt administration (Teddy, not Franklin), and is 100% XML-based. Once nice thing about ```deZip``` is that it allows you to get a nice clean object instead of a nasty XML maze of twisty little semantic nodes, all different.

Easy to use once you've set it up, but you'll need to get an application token from the USPS. That's the hard part, but, as my generosity is truly unbounded, I'm [providing the link here](https://www.usps.com/business/web-tools-apis/general-api-developer-guide.htm#_Toc24631953). (They don't make this easy to find.)

## Installation

Right now you have to just grab dezip.ts out of this repository. Coming real soon: ```npm```.

You'll also need the ```xml-js``` package. 
```bash
    % npm i --save xml-js
```

Once that's done, you'll need to do some modifications on files in the ```deZip``` directory.

## Usage

```typescript
/// Will change to just 'deZip' once npm is available
import { deZip } from './deZip/deZip'
...
const myTown = deZip('10010');
if ( myTown.error )
    throw myTown.error;
console.log( `${myTown.city}, ${myTown.state}, USA `);
```

### Stuff You Have to Do Now

*   *Get and save a USPS client ID*

    You'll have to create your own "constants#nocommit.js" (or .ts) file. The name helps you remember that you should never commit this file into your git repository. You don't want the postal inspectors after you!

    (Well, most likely they'll just turn off your key if it gets out. But why risk it?)

    My standard ```.gitignore``` includes an entry for ```*#nocommit.*```. Just a thought.

*   *Either get* ```clog``` *or use* ```console.log()```

    By default, deZip uses my ```clog``` console logger. You probably don't have that. I'm actually pretty sure you don't have that. So... follow the directions towards the top of deZip.ts to stick with good old ```console.log()```.

    Yeah, I know that's a lot of DIY for one tiny little package. But hey, take it from an old programmer: nothing worthwhile is easy.

## License
You can read the ```README-LICENSE.TXT``` file in the ```deZip``` folder. Short version: deZip is licensed under CC0-1.0.

## Issues
99.99% of problems will be due to something at USPS; a hung server, for example. If you have any comments or recommendations, feel free to contact me at scott.menter@gmail.com.

## About the Author
The history of my boring life is recounted in exquisite detail on [LinkedIn](http://linkedin.com/in/escott).