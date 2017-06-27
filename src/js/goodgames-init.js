import { options } from "./parts/_options";

if(typeof GoodGames !== 'undefined') {
    GoodGames.setOptions(options);
    GoodGames.init();
}
