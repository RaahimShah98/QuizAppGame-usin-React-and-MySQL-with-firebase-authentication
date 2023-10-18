import React from "react";

//style

import styles from "./footerNavBar.module.css";

function FooterNavBar() {
  return (
      <div id={styles.navBar}>
        <ul id={styles.navBarList}>
          <li class={styles.navBarListItem}>navbar1</li>
          <li class={styles.navBarListItem}>navbar2</li>
          <li class={styles.navBarListItem}>navbar3</li>
          <li class={styles.navBarListItem}>navbar4</li>
          <li class={styles.navBarListItem}>navbar5</li>
        </ul>
    </div>
  );
}

export default FooterNavBar;
