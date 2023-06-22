# Markdown Editor

This component primarily uses (Milkdown)[https://milkdown.dev] as the WYSIWYG editor, and also a raw `textarea` HTML element for users who prefer a basic input. The WYSIWYG editor could be hidden entirely for users who do not want to use it via a user setting flag.

The main element is `MarkdownEditor.vue` that handles both the rendering of markdown and the editing of elements that the user is permitted to edit. This is something we would use authentication to verify before posting any data to the server.

There is a placeholder API for fetching, updating, and posting comments that handle saving the comment in session storage. I am using [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) to sanitize the input before posting it to the server, which is something we would want to do before saving any data to the database. I chose remark and rehype because that is the parser that Milkdown uses, and I am *fairly* certain that they are sanitizing the input as well but I couldn't verify. If not, I will probably open a pull request to make sure the data is being sanitized.

## MarkdownProvider
The `MarkdownProvider` is a wrapper for `MilkdownProvider`, which is necessary for displaying markdown in html, and `ProseMirrorAdapterProvider`, which is necessary to send actions from the toolbar to the editor. It must be somewhere above both the `MilkdownEditor` and `MilkdownToolbar` to function, and for now I am wrapping the `CommentBlock` content to make this happen. If I chose to change the way the toolbar is displayed in the editor, this component would be built in to the editor itself and no longer necessary.

## MarkdownEditor
The `MarkdownEditor` is the main component involved in the editor. It it was is displaying the markdown in html, and the component that allows editors who have permission to both edit comments or post new comments to issue threads. It also includes the raw `textarea` element that allows users who do not want to use the WYSIWYG editor to edit their markdown directly.

The `MarkdownEditor` is using [Milkdown](https://milkdown.dev) as the editor, and aligns to both the CommonMark markdown syntax and Github's Github Flavored Markdown.

This supports all basic markdown functionality, including images that can be dragged and dropped in to the WYSIWYG editor and are base64 encoded in to the markdown string. There is a plugin with milkdown that allows you to handle a function when dragging and dropping an image, which we would use to upload user images to a data storage solution and return a url, similar to how Github handles this interaction.

In the future I would support dragging and dropping images directly in to the raw markdown editor to have the same functionality as the WYSIWYG editor.

## MarkdownToolbar
The `MarkdownToolbar` is a component that allows a user to use physical buttons to style their comment without having to know markdown.

Unfortunately this component is still inconsistent, being that the Milkdown docs are out of date while the project maintainer works on adding a toolbar component to the api. Wrapping a word in marks seems to escape the characters, before you press space and the text formats itself correctly. Unwrapping an element seems to work perfectly.

I have attempted to fix these issues, but with no documentation on that functionality, I can only get so far digging in to source code and the website repo. Given the opportunity I would dig in to this deeper and solidify the functionality before release.

## MarkdownListItem
`MarkdownListItem` is a custom component that allows the task list to be displayed inside of either numbered or unordered lists in markdown, and to add custom styles to the element, as well as functionality.

Currently there is a bug that causes nested tasks to display incorrectly, which is a bug in the way the list is rendered in html. This is something I would like to dive in to in the future.

## Thumbnail Mark
I have also added a custom markdown mark replicating Allspice's `!thumbnail(){}` mark. Unfortunately I was unable to directly copy that styling, and instead have to use a remark plugin called [remark-directive](https://github.com/remarkjs/remark-directive) to add this functionality, so the syntax for adding thumbnails is `::thumbnail[]{}`. In the future I would be able to support Allspice's mark directly, but the work that goes in to adding custom syntax is more than I really had time to dig in to for this project.

## Markdown Styles
I have attempted to recreate Allspices markdown styling as closely as possible in the `markdown-styles.scss` file, and any needed changes would be fairly trivial to add.
