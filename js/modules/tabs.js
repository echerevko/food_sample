function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClas
) {
  //Tabs
  //Tabs plan:
  // 1. Create a function that will hide unnecessary tabs. If you show them all at once, it will be very messy.
  // 2. Show main tab by default on page load
  // 3. Assign an event handler to the menu that will display the selected tab
  const tabs = document.querySelectorAll(tabsSelector), //Switch cards / tabs on the right, collection
    tabsContent = document.querySelectorAll(tabsContentSelector), // cards / tabs with the all content, collection
    tabsParent = document.querySelector(tabsParentSelector); //Perent switch cards / tabs on the right

  //1.
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
      //--- 2nd variant:
      //   item.style.display = 'none';
      // });
      tabs.forEach((item) => {
        item.classList.remove(activeClas);
      });
    });
  }

  //2.
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    //--- 2nd variant:
    // tabsContent[i].style.display = 'block';
    tabs[i].classList.add(activeClas);
  }

  hideTabContent();
  showTabContent();

  //3.
  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    console.dir(tabsParent);
    console.dir(target);

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, ind) => {
        if (target == item) {
          hideTabContent();
          showTabContent(ind);
        }
      });
    }
  });
}
export default tabs;
