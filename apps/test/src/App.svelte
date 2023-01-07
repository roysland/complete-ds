<script>
import 'styles'
import "elements"
let modal

const openModal = (idString) => {
  modal.setAttribute('visible', true)
}
</script>
<air-page>
  <!-- app bar -->
  <air-app-bar
    slot="top"
    logo="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
    label="MyApp"
  >
    <air-tabs>
      <air-tab-item label="Active" active></air-tab-item>
      <air-tab-item label="Idle"></air-tab-item>
      <air-tab-item label="Disabled" disabled></air-tab-item>
    </air-tabs>
    <air-icon
      slot="functions"
      button
      icon="brightness_3"
      on:click="{() => document.documentElement.setAttribute('theme', 'dark2')}"
    ></air-icon>
    <air-icon
      slot="functions"
      button
      icon="brightness_7"
      on:click="{() => document.documentElement.setAttribute('theme', 'high-contrast')}"
    ></air-icon>
    <air-icon
      slot="functions"
      button
      icon="brightness_3"
      on:click="{() => document.documentElement.setAttribute('theme', 'light')}"
    ></air-icon>
    <air-icon
    slot="left"
    button
    icon="brightness_3"
    on:click="{() => document.documentElement.setAttribute('theme', 'dark1')}"
  ></air-icon>
    <!-- avatar -->
    <air-avatar
      slot="functions"
      label="Øyvind Røysland"
      info="Frontend Lead"
      image="https://randomuser.me/api/portraits/men/18.jpg"
    ></air-avatar>
  </air-app-bar>

  <!-- panes -->
    <air-accordion label="Accordion">
      <air-icon icon="save" button slot="functions"></air-icon>
      <air-input></air-input>
      <air-button label="Label" slot="footer"></air-button>
    </air-accordion>
    <air-accordion label="Textarea">
      <air-textarea label="Autofocus" autofocus></air-textarea>
      <air-textarea label="Empty"></air-textarea>
      <air-textarea
        label="Pre-filled"
        value="Lorem ipsum dolor sit amet"
      ></air-textarea>
      <air-textarea
        label="2 Rows"
        rows="2"
        value="Lorem ipsum dolor sit amet"
      ></air-textarea>
      <air-textarea
        label="4 Rows Readonly"
        rows="4"
        readonly
        value="Lorem ipsum dolor sit amet"
      ></air-textarea>
      <air-textarea
        label="4 Rows Disabled"
        rows="4"
        disabled
        value="Lorem ipsum dolor sit amet"
      ></air-textarea>
    </air-accordion>
    <!-- image -->
    <air-accordion label="Image">
      <air-image
        src="https://i.ytimg.com/vi/BfCwN4iy6T8/maxresdefault.jpg"
        legend="Inner top legend"
        legend-position="inner-top"
        alt="Image"
      >
        <air-icon icon="save" slot="top"></air-icon>
        <air-icon icon="save" slot="bottom"></air-icon>
      </air-image>
      <air-image
        src="https://i.ytimg.com/vi/BfCwN4iy6T8/maxresdefault.jpg"
        legend="Inner bottom legend"
        legend-position="inner-bottom"
        alt="Image"
      >
        <air-icon icon="save" slot="top"></air-icon>
        <air-icon icon="save" slot="bottom"></air-icon>
      </air-image>
      <air-image
        src="https://i.ytimg.com/vi/BfCwN4iy6T8/maxresdefault.jpg"
        legend="Bottom legend"
        alt="Image"
      >
        <air-icon icon="save" slot="top"></air-icon>
        <air-icon icon="save" slot="bottom"></air-icon>
      </air-image>
      <air-image
        src="https://i.ytimg.com/vi/BfCwN4iy6T8/maxresdefault.jpg"
        width="160"
        height="320"
        fit="cover"
        alt="Image"
      >
        <air-icon icon="save" slot="top"></air-icon>
        <air-icon icon="save" slot="bottom"></air-icon>
      </air-image>
    </air-accordion>
    <!-- slider -->
    <air-accordion label="Slider">
      <air-slider></air-slider>
      <air-slider label="Label" value="50"></air-slider>
      <air-slider
        label="Label"
        min="0"
        max="200"
        step="10"
        value="150"
      ></air-slider>
      <air-slider
        label="Label"
        min="0"
        max="200"
        step="10"
        value="150"
        input
      ></air-slider>
    </air-accordion>
    <!-- switch -->
    <air-accordion label="Switch">
      <air-switch>
        <air-switch-item label="First" disabled></air-switch-item>
        <air-switch-item label="Second"></air-switch-item>
        <air-switch-item label="Active" active></air-switch-item>
      </air-switch>
      <air-switch>
        <air-switch-item icon="train" disabled></air-switch-item>
        <air-switch-item icon="directions_car"></air-switch-item>
        <air-switch-item icon="directions_bike" active></air-switch-item>
      </air-switch>
    </air-accordion>
    <!-- stepper -->
    <air-accordion label="Stepper">
      <!-- horizontal -->
      <air-stepper>
        <air-stepper-item label="First" disabled></air-stepper-item>
        <air-stepper-item label="Second"></air-stepper-item>
        <air-stepper-item label="Active" active></air-stepper-item>
      </air-stepper>
      <air-stepper>
        <air-stepper-item
          label="Second"
          info="Information text"
        ></air-stepper-item>
        <air-stepper-item
          label="Active"
          info="Information text"
          active
        ></air-stepper-item>
      </air-stepper>
      <air-stepper>
        <air-stepper-item
          label="First"
          icon="train"
          disabled
        ></air-stepper-item>
        <air-stepper-item
          label="Second"
          icon="directions_car"
        ></air-stepper-item>
        <air-stepper-item
          label="Active"
          icon="directions_bike"
          active
        ></air-stepper-item>
      </air-stepper>
      <!-- vertical -->
      <air-stepper orientation="vertical">
        <air-stepper-item label="First" disabled></air-stepper-item>
        <air-stepper-item label="Second"></air-stepper-item>
        <air-stepper-item label="Active" active></air-stepper-item>
      </air-stepper>
      <air-stepper orientation="vertical">
        <air-stepper-item
          label="First"
          info="Information text"
          disabled
        ></air-stepper-item>
        <air-stepper-item
          label="Second"
          info="Information text"
        ></air-stepper-item>
        <air-stepper-item
          label="Active"
          info="Information text"
          active
        ></air-stepper-item>
      </air-stepper>
      <air-stepper orientation="vertical">
        <air-stepper-item
          label="First"
          icon="train"
          disabled
        ></air-stepper-item>
        <air-stepper-item
          label="Second"
          icon="directions_car"
        ></air-stepper-item>
        <air-stepper-item
          label="Active"
          icon="directions_bike"
          active
        ></air-stepper-item>
      </air-stepper>
    </air-accordion>
    <!-- breadcrumbs -->
    <air-accordion label="Breadcrumbs">
      <air-breadcrumbs>
        <air-breadcrumb-item label="First"></air-breadcrumb-item>
        <air-breadcrumb-item label="Second"></air-breadcrumb-item>
        <air-breadcrumb-item label="Active" active></air-breadcrumb-item>
      </air-breadcrumbs>
    </air-accordion>
    <!-- avatar -->
    <air-accordion label="Avatar">
      <air-avatar></air-avatar>
      <air-avatar label="First Last"></air-avatar>
      <air-avatar
        label="First Middle Last"
        info="Information text"
        image="https://i1.wp.com/www.docker.com/blog/wp-content/uploads/2019/10/Renee-M.jpg?fit=753%2C1024&ssl=1"
      ></air-avatar>
    </air-accordion>
    <!-- inputs -->
    <air-accordion label="Input">
      <!-- text -->
      <air-input condensed label="Text condensed empty"></air-input>
      <air-input label="Text filled" value="Hi"></air-input>
      <air-input label="Text icon" icon="text_format"></air-input>
      <air-input label="Text icon">
        <air-icon button icon="text_format" slot="functions"></air-icon>
      </air-input>
      <!-- search -->
      <air-input label="Search" value="Hi" type="search"></air-input>
      <!-- number -->
      <air-input
        condensed
        label="Number condensed empty"
        type="number"
      ></air-input>
      <air-input
        label="Number empty (min 50, max 100, step 10)"
        type="number"
        min="50"
        max="100"
        step="10"
      ></air-input>
      <air-input
        label="Number filled"
        type="number"
        value="150"
      ></air-input>
      <br />
      <!-- date -->
      <air-input type="date"></air-input>
      <!-- select -->
      <air-input type="select" label="Select">
        <air-menu-item label="Option 1"></air-menu-item>
        <air-menu-item label="Option 2"></air-menu-item>
        <air-menu-item label="Option 3" active></air-menu-item>
        <air-menu-item label="Option 4"></air-menu-item>
        <air-menu-item label="Option 5"></air-menu-item>
        <air-menu-item label="Option 6"></air-menu-item>
        <air-menu-item label="Option 7"></air-menu-item>
        <air-menu-item label="Option 8"></air-menu-item>
        <air-menu-item label="Option 9"></air-menu-item>
        <air-menu-item label="Option 10"></air-menu-item>
        <air-menu-item label="Option 11"></air-menu-item>
      </air-input>
      <!-- status -->
      <air-input label="Status error" status="error"></air-input>
      <air-input label="Status success" status="success"></air-input>
      <air-input label="Status warning" status="warning"></air-input>
      <br />
      <air-input disabled label="Disabled" status="error"></air-input>
      <air-input readonly label="Readonly" status="error"></air-input>
    </air-accordion>
    <!-- checkbox -->
    <air-accordion label="Checkbox">
      <air-checkbox></air-checkbox>
      <air-checkbox label="With label"></air-checkbox>
      <air-checkbox label="Active" active></air-checkbox>
      <air-checkbox label="Disabled" disabled></air-checkbox>
      <air-checkbox label="Active Disabled" active disabled></air-checkbox>
    </air-accordion>
    <!-- radio button -->
    <air-accordion label="Radio Button">
      <air-radio></air-radio>
      <air-radio label="With label"></air-radio>
      <air-radio label="Active" active></air-radio>
      <air-radio label="Disabled" disabled></air-radio>
      <air-radio
        label="Active Disabled"
        active
        disabled
      ></air-radio>
    </air-accordion>
    <!-- checkbox -->
    <air-accordion label="Toggle">
      <air-toggle></air-toggle>
      <air-toggle label="With label"></air-toggle>
      <air-toggle label="Active" active></air-toggle>
      <air-toggle label="Disabled" disabled></air-toggle>
      <air-toggle label="Active Disabled" active disabled></air-toggle>
    </air-accordion>
    <!-- buttons -->
    <air-accordion label="Button">
      <air-button label="Primary"></air-button>
      <air-button label="Secondary" color="secondary"></air-button>
      <air-button label="Tertiary" color="tertiary"></air-button>
      <air-button label="Primary" disabled></air-button>
      <air-button label="Secondary" color="secondary" disabled></air-button>
      <air-button label="Tertiary" color="tertiary" disabled></air-button>
      <air-button icon="save"></air-button>
      <air-button icon="save" color="secondary"></air-button>
      <air-button icon="save" color="tertiary"></air-button>
      <air-button icon="save" disabled></air-button>
      <air-button icon="save" color="secondary" disabled></air-button>
      <air-button icon="save" color="tertiary" disabled></air-button>
    </air-accordion>
    <!-- tool -->
    <air-accordion label="Tool">
      <air-tool label="Label ipsum amet"></air-tool>
      <air-tool label="Label ipsum amet" toggle></air-tool>
      <air-tool label="Label ipsum amet" active></air-tool>
      <air-tool label="Label ipsum amet" disabled></air-tool>
      <air-tool label="Label ipsum amet" size="s"></air-tool>
      <air-tool label="Label ipsum amet" size="s" toggle></air-tool>
      <air-tool label="Label ipsum amet" size="s" active></air-tool>
      <air-tool label="Label ipsum amet" size="s" disabled></air-tool>
      <air-tool icon="train"></air-tool>
      <air-tool icon="train" toggle></air-tool>
      <air-tool icon="train" active></air-tool>
      <air-tool icon="train" disabled></air-tool>
      <air-tool icon="train" size="s"></air-tool>
      <air-tool icon="train" size="s" toggle></air-tool>
      <air-tool icon="train" size="s" active></air-tool>
      <air-tool icon="train" size="s" disabled></air-tool>
      <air-tool label="Label ipsum amet" icon="train"></air-tool>
      <air-tool label="Label ipsum amet" icon="train" toggle></air-tool>
      <air-tool label="Label ipsum amet" icon="train" active></air-tool>
      <air-tool label="Label ipsum amet" icon="train" disabled></air-tool>
      <air-tool label="Label ipsum amet" size="s" icon="train"></air-tool>
      <air-tool
        label="Label ipsum amet"
        size="s"
        icon="train"
        toggle
      ></air-tool>
      <air-tool
        label="Label ipsum amet"
        size="s"
        icon="train"
        active
      ></air-tool>
      <air-tool
        label="Label ipsum amet"
        size="s"
        icon="train"
        disabled
      ></air-tool>
    </air-accordion>
    <!-- icons -->
    <air-accordion label="Icon">
      <air-icon
        icon="url('https://material.io/resources/icons/static/ic_icons_192px_light.svg')"
      ></air-icon>
      <air-icon icon="save"></air-icon>
      <air-icon icon="save" button></air-icon>
      <air-icon icon="save" disabled></air-icon>
      <air-icon icon="save" color="rgb(var(--accent-1))"></air-icon>
      <air-icon icon="save" size="s"></air-icon>
      <air-icon icon="save" size="l"></air-icon>
      <air-icon icon="save" size="xl"></air-icon>
    </air-accordion>
    <!-- badge -->
    <air-accordion label="Badge">
      <air-badge></air-badge>
      <air-badge label="1"></air-badge>
      <air-badge label="13"></air-badge>
      <air-badge label="130"></air-badge>
      <air-badge label="1300"></air-badge>
      <air-badge status="error"></air-badge>
      <air-badge status="warning"></air-badge>
      <air-badge status="success"></air-badge>
    </air-accordion>
    <!-- tag -->
    <air-accordion label="Tag">
      <air-tag label="With label"></air-tag>
      <air-tag label="Button" button></air-tag>
      <air-tag icon="train" label="With label, icon"></air-tag>
      <air-tag icon="train" label="With label, icon" removable></air-tag>
    </air-accordion>
    <!-- progress bar -->
    <air-accordion label="Progress Bar">
      <air-progress-bar value="20"></air-progress-bar>
      <air-progress-bar value="20" label="With label"></air-progress-bar>
      <air-progress-bar
        value="20"
        label="Show progress"
        show-progress
      ></air-progress-bar>
      <air-progress-bar
        value="20"
        label="With info"
        info="Slow connection detected"
      ></air-progress-bar>
      <air-progress-bar
        value="20"
        label="With info, status"
        status="warning"
        info="Slow connection detected"
      ></air-progress-bar>
      <air-progress-bar
        value="20"
        label="Color"
        color="red"
      ></air-progress-bar>
      <br />
      <air-progress-bar radial value="20"></air-progress-bar>
      <air-progress-bar
        radial
        value="20"
        label="With label"
      ></air-progress-bar>
      <air-progress-bar
        radial
        value="20"
        label="Show progress"
        show-progress
      ></air-progress-bar>
      <air-progress-bar
        radial
        value="20"
        label="With info"
        info="Slow connection detected"
      ></air-progress-bar>
      <air-progress-bar
        radial
        value="20"
        label="With info, status"
        status="warning"
        info="Slow connection detected"
      ></air-progress-bar>
      <air-progress-bar
        radial
        value="20"
        label="Color"
        color="red"
      ></air-progress-bar>
      <air-progress-bar
        radial
        value="20"
        label="Size s"
        size="s"
      ></air-progress-bar>
      <air-progress-bar
        radial
        value="20"
        label="Size l"
        size="l"
      ></air-progress-bar>
    </air-accordion>
    <!-- spinner -->
    <air-accordion label="Spinner">
      <air-spinner></air-spinner>
      <air-spinner label="Size m, with label"></air-spinner>
      <air-spinner size="s"></air-spinner>
      <air-spinner size="s" label="Size s, with label"></air-spinner>
    </air-accordion>
    <!-- menu item -->
    <air-accordion label="Menu Item">
      <air-menu-item
        label="Idle toggle='false'"
        toggle="false"
      ></air-menu-item>
      <air-menu-item label="With icon" icon="save"></air-menu-item>
      <air-menu-item label="Icon slot">
        <air-icon button icon="save" slot="functions"></air-icon>
      </air-menu-item>
      <air-menu-item label="Active" active></air-menu-item>
      <air-menu-item label="Disabled" disabled></air-menu-item>
    </air-accordion>
    <!-- popover -->
    <air-accordion label="Popover">
      <!-- targets -->
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_up"
        id="popover-tar-1"
      ></air-icon>
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_down"
        id="popover-tar-2"
      ></air-icon>
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_left"
        id="popover-tar-3"
      ></air-icon>
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_right"
        id="popover-tar-4"
      ></air-icon>
      <!-- popovers -->
      <air-popover
        target="#popover-tar-1"
        position="top"
        label="Top"
      ></air-popover>
      <air-popover target="#popover-tar-2">
        <air-tabs slot="header">
          <air-tab-item label="Tab 1" active></air-tab-item>
          <air-tab-item label="Tab 2"></air-tab-item>
        </air-tabs>
        <air-icon button icon="save" slot="footer"></air-icon>
      </air-popover>
      <air-popover target="#popover-tar-3" position="left" label="Left">
        <air-button label="Button" slot="footer"></air-button>
      </air-popover>
      <air-popover target="#popover-tar-4" position="right" label="Right">
        <air-icon button icon="save" slot="footer"></air-icon>
        <air-icon button icon="save" slot="footer"></air-icon>
      </air-popover>
    </air-accordion>
    <!-- popover -->
    <air-accordion label="Tooltip">
      <!-- targets -->
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_up"
        id="tooltip-tar-1"
      ></air-icon>
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_down"
        id="tooltip-tar-2"
      ></air-icon>
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_left"
        id="tooltip-tar-3"
      ></air-icon>
      <air-icon
        button
        slot="footer"
        icon="keyboard_arrow_right"
        id="tooltip-tar-4"
      ></air-icon>
      <!-- popovers -->
      <air-tooltip
        target="#tooltip-tar-1"
        position="top"
        label="Top"
      ></air-tooltip>
      <air-tooltip target="#tooltip-tar-2">
        <air-tabs slot="header">
          <air-tab-item label="Tab 1" active></air-tab-item>
          <air-tab-item label="Tab 2"></air-tab-item>
        </air-tabs>
        <air-icon button icon="save" slot="footer"></air-icon>
      </air-tooltip>
      <air-tooltip target="#tooltip-tar-3" position="left" label="Left">
        <air-button label="Button" slot="footer"></air-button>
      </air-tooltip>
      <air-tooltip target="#tooltip-tar-4" position="right" label="Right">
        <air-icon button icon="save" slot="footer"></air-icon>
        <air-icon button icon="save" slot="footer"></air-icon>
      </air-tooltip>
    </air-accordion>
    <!-- tabs -->
    <air-accordion label="Tabs">
      <!-- horizontal -->
      <air-tabs>
        <air-tab-item label="Active" active></air-tab-item>
        <air-tab-item label="Idle"></air-tab-item>
        <air-tab-item label="Disabled" disabled></air-tab-item>
      </air-tabs>
      <air-tabs>
        <air-tab-item label="Active" icon="train" active></air-tab-item>
        <air-tab-item label="Idle" icon="train"></air-tab-item>
        <air-tab-item label="Disabled" icon="train" disabled></air-tab-item>
      </air-tabs>
      <air-tabs>
        <air-tab-item icon="train" active></air-tab-item>
        <air-tab-item icon="train"></air-tab-item>
        <air-tab-item icon="train" disabled></air-tab-item>
      </air-tabs>
      <!-- vertical -->
      <air-tabs orientation="vertical">
        <air-tab-item label="Active" active></air-tab-item>
        <air-tab-item label="Idle"></air-tab-item>
        <air-tab-item label="Disabled" disabled></air-tab-item>
      </air-tabs>
      <air-tabs orientation="vertical">
        <air-tab-item label="Active" icon="train" active></air-tab-item>
        <air-tab-item label="Idle" icon="train"></air-tab-item>
        <air-tab-item label="Disabled" icon="train" disabled></air-tab-item>
      </air-tabs>
      <air-tabs orientation="vertical">
        <air-tab-item icon="train" active></air-tab-item>
        <air-tab-item icon="train"></air-tab-item>
        <air-tab-item icon="train" disabled></air-tab-item>
      </air-tabs>
    </air-accordion>
    <!-- modal -->
    <air-accordion label="Modal">
      <!-- targets -->
      <air-button
        label="With label, icon"
        onclick="document.querySelector('#modal').visible = true"
      ></air-button>
      <air-button
        label="With slots, sticky, size"
        on:click={openModal}
      ></air-button>
      <!-- modals -->
      <air-modal label="My Modal" icon="email" id="modal" bind:this={modal}>
        <air-input></air-input>
        <air-input></air-input>
      </air-modal>
      <air-modal height="400px" width="400px" sticky id="modal-2">
        <air-tabs slot="header">
          <air-tab-item label="Active" active></air-tab-item>
          <air-tab-item label="Idle"></air-tab-item>
          <air-tab-item label="Disabled" disabled></air-tab-item>
        </air-tabs>
        <air-icon button icon="save" slot="functions"></air-icon>
        <air-button
          slot="footer"
          label="Close Modal"
          onclick="event.target.parentElement.visible = false"
        ></air-button>
      </air-modal>
    </air-accordion>
    <!-- notifications -->
    <air-accordion label="Notifications">
      <!-- targets -->
      <air-button
        label="Top Left"
        onclick="document.querySelector('#notification-1').visible = true"
      ></air-button>
      <air-button
        label="Top Right"
        onclick="document.querySelector('#notification-2').visible = true"
      ></air-button>
      <air-button
        label="Bottom Left"
        onclick="document.querySelector('#notification-3').visible = true"
      ></air-button>
      <air-button
        label="Bottom Right"
        onclick="document.querySelector('#notification-4').visible = true"
      ></air-button>
    </air-accordion>
    <!-- drawer -->
    <air-accordion label="Drawer">
      <!-- targets -->
      <air-button
        label="Left with label, icon"
        on:click="{() => document.querySelector('#drawer-left').visible = true}"
      ></air-button>
      <air-button
        label="Right, with slots, sticky"
        on:click="{() => document.querySelector('#drawer-right').visible = true}"
      ></air-button>
      <air-button
        label="Top"
        on:click="{() => document.querySelector('#drawer-top').visible = true}"
      ></air-button>
      <air-button
        label="Bottom"
        on:click="{() => document.querySelector('#drawer-bottom').visible = true}"
      ></air-button>
      <!-- drawers -->
      <air-drawer
        position="left"
        label="Left Drawer"
        icon="email"
        id="drawer-left"
      ></air-drawer>
      <air-drawer position="right" sticky id="drawer-right">
        <air-tabs slot="header">
          <air-tab-item label="Active" active></air-tab-item>
          <air-tab-item label="Idle"></air-tab-item>
          <air-tab-item label="Disabled" disabled></air-tab-item>
        </air-tabs>
        <air-icon button icon="save" slot="functions"></air-icon>
        <air-button
          slot="footer"
          label="Close Drawer"
          on:click="{() => event.target.parentElement.visible = false}"
        ></air-button>
      </air-drawer>
      <air-drawer
        position="top"
        label="Top Drawer"
        id="drawer-top"
      ></air-drawer>
      <air-drawer
        position="bottom"
        label="Top Drawer"
        id="drawer-bottom"
      ></air-drawer>
    </air-accordion>
    <!-- text -->
    <air-accordion label="Text">
      <air-text>Body 1, Text 1</air-text>
      <air-text size="body-1" color="var(--text-2)"
        >Body 1, Text 2</air-text
      >
      <air-text size="body-1" color="var(--text-3)"
        >Body 1, Text 3</air-text
      >
      <air-text size="body-2" color="var(--text-1)"
        >Body 2, Text 1</air-text
      >
      <air-text size="body-2" color="var(--text-2)"
        >Body 2, Text 2</air-text
      >
      <air-text size="body-2" color="var(--text-3)"
        >Body 2, Text 3</air-text
      >
      <air-text size="header-1" color="var(--text-1)"
        >Header 1, Text 1</air-text
      >
      <air-text size="header-1" color="var(--text-2)"
        >Header 1, Text 2</air-text
      >
      <air-text size="header-1" color="var(--text-3)"
        >Header 1, Text 3</air-text
      >
      <air-text size="header-2" color="var(--text-1)"
        >Header 2, Text 1</air-text
      >
      <air-text size="header-2" color="var(--text-2)"
        >Header 2, Text 2</air-text
      >
      <air-text size="header-2" color="var(--text-3)"
        >Header 2, Text 3</air-text
      >
    </air-accordion>
    <!-- text -->
    <air-accordion label="Divider">
      Spacing s
      <air-divider spacing="s"></air-divider>
      Spacing m
      <air-divider spacing="m"></air-divider>
      Spacing l
      <air-divider spacing="l"></air-divider>
      <div style="display: flex; height: 48px">
        S
        <air-divider spacing="s" orientation="vertical"></air-divider>
        M
        <air-divider spacing="m" orientation="vertical"></air-divider>
        L
        <air-divider spacing="l" orientation="vertical"></air-divider>
      </div>
    </air-accordion>
    <!-- empty state -->
    <air-accordion label="Empty State">
      <air-empty-state
        style="height: 160px"
        label="With label"
      ></air-empty-state>
      <air-empty-state
        style="height: 160px"
        label="With label, icon"
        icon="train"
      ></air-empty-state>
      <air-empty-state
        style="height: 160px"
        label="With label, icon, footer"
        icon="train"
      >
        <air-button label="Button" slot="footer"></air-button>
      </air-empty-state>
    </air-accordion>


    <air-icon slot="functions" button icon="save"></air-icon>
    <!-- menu items -->
    <air-accordion label="Idle"></air-accordion>
    <air-accordion
      label="Expanded, Icon"
      icon="message"
      expanded
    ></air-accordion>
    <air-accordion label="Disabled" disabled></air-accordion>
    <!-- buttons -->
    <air-button label="Button" slot="footer"></air-button>

  <!-- grid -->
  <air-grid rows="2">
    <!-- cards -->
    <air-card
      label="With label, icon, slots"
      icon="extension"
      grid-cols="6"
    >
      <air-icon button slot="functions" icon="save"></air-icon>
      <air-table columns="2fr 1fr 1fr">
        <air-table-row slot="header">
          <air-table-cell head sortable sorted sort-direction="desc"
            >Sortable A</air-table-cell
          >
          <air-table-cell head sortable>Sortable B</air-table-cell>
          <air-table-cell head sortable>Sortable C</air-table-cell>
        </air-table-row>
        <!-- swipe-actions -->
        <air-swipe-actions>
          <air-swipe-action
            slot="left"
            icon="delete"
            bg-color="rgb(var(--functional-red))"
          ></air-swipe-action>
          <air-table-row>
            <air-table-cell>Cell 1A</air-table-cell>
            <air-table-cell>Cell 1B</air-table-cell>
            <air-table-cell>Cell 1C</air-table-cell>
          </air-table-row>
          <air-swipe-action
            slot="right"
            icon="reply"
            bg-color="rgb(var(--functional-green))"
          ></air-swipe-action>
        </air-swipe-actions>
        <air-swipe-actions>
          <air-swipe-action slot="left" icon="save"></air-swipe-action>
          <air-table-row>
            <air-table-cell>Cell 1A</air-table-cell>
            <air-table-cell>Cell 1B</air-table-cell>
            <air-table-cell>Cell 1C</air-table-cell>
          </air-table-row>
        </air-swipe-actions>
        <air-table-row>
          <air-table-cell>Cell 1A</air-table-cell>
          <air-table-cell>Cell 1B</air-table-cell>
          <air-table-cell>Cell 1C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 2A</air-table-cell>
          <air-table-cell>Cell 2B</air-table-cell>
          <air-table-cell>Cell 2C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 3A</air-table-cell>
          <air-table-cell>Cell 3B</air-table-cell>
          <air-table-cell>Cell 3C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 4A</air-table-cell>
          <air-table-cell>Cell 4B</air-table-cell>
          <air-table-cell>Cell 4C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 5A</air-table-cell>
          <air-table-cell>Cell 5B</air-table-cell>
          <air-table-cell>Cell 5C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 6A</air-table-cell>
          <air-table-cell>Cell 6B</air-table-cell>
          <air-table-cell>Cell 6C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 6A</air-table-cell>
          <air-table-cell>Cell 6B</air-table-cell>
          <air-table-cell>Cell 6C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 7A</air-table-cell>
          <air-table-cell>Cell 7B</air-table-cell>
          <air-table-cell>Cell 7C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 8A</air-table-cell>
          <air-table-cell>Cell 8B</air-table-cell>
          <air-table-cell>Cell 8C</air-table-cell>
        </air-table-row>
        <air-table-row>
          <air-table-cell>Cell 9A</air-table-cell>
          <air-table-cell>Cell 9B</air-table-cell>
          <air-table-cell>Cell 9C</air-table-cell>
        </air-table-row>
      </air-table>
      <air-button label="Button" disabled slot="footer"></air-button>
    </air-card>
    <air-card grid-cols="6" grid-rows="2">
      <air-table readonly condensed>
        <air-table-row slot="header">
          <air-table-cell head grid-cols="8">Head A</air-table-cell>
          <air-table-cell head grid-cols="8" alignment="center"
            >Head B</air-table-cell
          >
          <air-table-cell head grid-cols="8" alignment="right"
            >Head C</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
        <air-table-row>
          <air-table-cell grid-cols="8">Cond. left</air-table-cell>
          <air-table-cell grid-cols="8" alignment="center"
            >Cond. center</air-table-cell
          >
          <air-table-cell grid-cols="8" alignment="right"
            >Cond. right</air-table-cell
          >
        </air-table-row>
      </air-table>
    </air-card>
    <air-card grid-cols="2"></air-card>
    <air-card
      grid-cols="4"
      label="Image Card"
      icon="image"
      image="https://i.ytimg.com/vi/BfCwN4iy6T8/maxresdefault.jpg"
    ></air-card>
  </air-grid>
  <!-- notifications -->
  <air-notifications position="top-left">
    <air-notification-item
      label="Top left with icon"
      icon="directions_car"
      id="notification-1"
    ></air-notification-item>
  </air-notifications>
  <air-notifications position="top-right">
    <air-notification-item
      id="notification-2"
      label="Top right, sticky with slots"
      sticky
    >
      <air-icon button slot="functions" icon="save"></air-icon>
      This is the notification with content.
      <air-button
        label="Button"
        slot="footer"
        onclick="event.target.parentElement.visible = false"
      ></air-button>
    </air-notification-item>
  </air-notifications>
  <air-notifications position="bottom-left">
    <air-notification-item
      label="Bottom left"
      id="notification-3"
    ></air-notification-item>
  </air-notifications>
  <air-notifications position="bottom-right">
    <air-notification-item
      label="Bottom right"
      id="notification-4"
    ></air-notification-item>
  </air-notifications>
</air-page>