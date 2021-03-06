import {upperSnakeCase} from './helpers/util';

const getNamespace = ({name}) =>
  `@@resource/${upperSnakeCase(name)}`;

const getActionKey = ({name, pluralName, actionKey, actionOpts = {}}) => {
  // `${actionKey.toUpperCase()}`;
  const actualPluralName = pluralName || `${name}s`;
  return `${actionKey.toUpperCase()}_${upperSnakeCase(actionOpts.isArray ? actualPluralName : name)}`;
};

const getActionType = ({name, actionKey}) =>
  // `${actionKey.toUpperCase()}_${name.toUpperCase()}${action.isArray ? 'S' : ''}`;
  `${getNamespace({name})}/${actionKey.toUpperCase()}`;

const createTypes = ({name, actions}) =>
  Object.keys(actions).reduce((types, actionKey) => {
    const actionOpts = actions[actionKey];
    const type = getActionType({name, actionOpts, actionKey});
    return Object.assign(types, {[getActionKey({name, actionOpts, actionKey})]: type});
  }, {});

export {createTypes, getNamespace, getActionKey, getActionType};
