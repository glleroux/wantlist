import { wantlist } from "./rtbWantlist"
import Elo from "@pelevesque/elo";

const releases = wantlist.map(release => ({title: release.basic_information.title, id: release.id, rank: 1500}))
const tempReleaseList = releases.slice(0,10)

const elo = new Elo();



//user starts game
//if there are at least two releases that haven't been pitted against each other
//present 2 releases that haven't been pitted against each other
//allow user selection
//update rank

//find releases (random, available)
//record selection, update scores, record result 
//

//export default myFunc