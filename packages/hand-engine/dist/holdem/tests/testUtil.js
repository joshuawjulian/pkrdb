export let optionArrayToString = (options) => {
    return options.reduce((acc, option) => [...acc, option.action], new Array());
};
