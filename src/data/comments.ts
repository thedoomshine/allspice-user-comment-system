/* eslint-disable no-useless-escape */
import type { CommentProps } from '~/types'

import { users } from './users'

const userData: CommentProps[] = [
  {
    user: { ...users.kyle },
    id: '9081237418092374',
    posted_at: 'Thu, 11 Mar 2021 17:38:19 UTC',
    role: 'Owner',
    attachment: {
      url: 'https://hub.allspice.io/attachments/37b73d49-9763-430c-8ef2-8d7146fbcf4c',
      title: 'Endstops_ESD.png',
      size: '28 KiB',
    },

    markdown: `*Disclaimer: The following data is fictional and does not represent real-world performance of the Archimajor Rambo Board*

## Summary
!thumbnail[Endstops](EndStops.SchDoc){ commit="9f594c695a488ea6b576d21e42408135cf2fb548" view-coords="9,62,40,103" href="https://hub.allspice.io/AllSpice/Archimajor/src/commit/9f594c695a488ea6b576d21e42408135cf2fb548/EndStops.SchDoc" aspect-ratio="1.501"}

v0.4 of the Alpha main board fails required spec: 4KV contact discharge at endstop inputs.

Failure Mode(s): 10/10 cases SAM3X processor enters reset condition. 2/10 cases, memory is corrupted.




[Left] Relevant Schematic

## Test setup
TBD

## Analysis
Atmel [SAM3X](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-11057-32-bit-Cortex-M3-Microcontroller-SAM3X-SAM3A_Datasheet.pdf) (pg. 1378) specifies max VDDIO operating voltage of **4.0V**. Contact ESD discharge with no alternate ground path exceeds this value with significant energy content.

## Simulation Results
The following simulation shows the circuit response to 4K discharge with no ESD protection.
![Endstop Circuit](https://hub.allspice.io/attachments/37b73d49-9763-430c-8ef2-8d7146fbcf4c "Endstop Circuit")

![ESD Base](https://raw.githubusercontent.com/AllSpiceIO/Archimajor/7ce1854e2ecebede7c92cea9e21a71155f8da14a/Simulation/ESD/Endstops_ESD.svg "ESD Endstop Base Condition")
The input stimulus shown at 4KV

![ESD Base](https://raw.githubusercontent.com/AllSpiceIO/Archimajor/7ce1854e2ecebede7c92cea9e21a71155f8da14a/Simulation/ESD/Endstops_ESD_SAM3X.svg "ESD Endstop Base Condition @ SAM3X")
VDDIO reaching 65V at the SAM3X chip clearly exceeds voltage specification of 4.0V`,
  },
  {
    user: { ...users.morgan },
    id: '5461723541872465',
    posted_at: 'Fri, 16 Jun 2023 19:15:41 GMT',
    role: 'Contributor',
    markdown: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

![allspice](https://pixy.org/src/24/243994.png)

Normal paragraph text.

* List
* List
* List

1. List
1. List
1. List

\`Inline code\`

\`\`\`
<!-- Code block -->
<h1>Sample heading</h1>
\`\`\`

*Italic text 1*

**Bold text 1**

> Blockquote text.

[Link](http://example.com)

Horizontal Rule

---

~~Strikethrough~~

\`\`\`javascript
function doSomething() {
  // Write code here
}
\`\`\`

- [ ] incomplete task
- [x] completed task

1. [ ] incomplete task
2. [x] completed task

First Header | Second Header
------------ | -------------
cell 1       | cell 2
cell 3       | cell 4

Heading 1
===
Heading 2
---

- List
  - Sub List
    - Sub Sub List
- List
- List

1. List
   1. Sub List
   2. Sub List
2. List
3. List

_Italic text 2_

__Bold text 2__

\`\`\`
    // A sample code block
    console.log("Sample code block");
\`\`\`

[Link][1]

Horizontal Rule

***

[1]:http://example.com`,
  },
]

export default userData
