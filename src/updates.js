function statusToggler(box, list) {
  box.addEventListener('change', () => {
    const nextSibling = box.nextElementSibling.value;
    list.forEach((element) => {
      if (box.checked && nextSibling === element.description) {
        element.completed = true;
        localStorage.setItem('pushing', JSON.stringify(list));
      } else if (!box.checked && nextSibling === element.description) {
        element.completed = false;
        localStorage.setItem('pushing', JSON.stringify(list));
      }
    });
  });
}

export default statusToggler;
