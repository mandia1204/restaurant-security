import dep from './dep.js';

const Cli = () => {
  const obj = dep();
  const _met = () => {
    return obj.met() * 2;
  };
  return {
    met: _met
  }
};
export default Cli;
