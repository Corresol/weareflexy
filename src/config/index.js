import { merge } from 'lodash';

module.exports = merge(
    require('./base'), 
    require('./development'), 
    require('./test'), 
    require('./production')
);
