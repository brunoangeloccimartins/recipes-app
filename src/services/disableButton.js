const disableButton = (arrProgress, setState) => {
  const everyTrue = arrProgress.every((check) => check === true);
  if (everyTrue) {
    setState(false);
  } else {
    setState(true);
  }
};

export default disableButton;
