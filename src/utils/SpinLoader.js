import {React} from 'react'
import { BeatLoader } from 'react-spinners';

function Loader() {
    return (
        <BeatLoader style={{'display':'flex','height':'100vh', 'alignItems':'center', 'justifyContent':'center', 'width':'84vw'}} color='purple' />
    );
}

export default Loader;