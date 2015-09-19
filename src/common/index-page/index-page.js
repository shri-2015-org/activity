import './index.styl';
import { get } from '../../api';

const projects = [
    'activity'
];

get(projects).then(response => console.log);
