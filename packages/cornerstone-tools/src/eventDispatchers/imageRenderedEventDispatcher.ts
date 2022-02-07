import { EVENTS as RenderingEngineEvents } from '@precisionmetrics/cornerstone-render'
import triggerAnnotationRender from '../util/triggerAnnotationRender'

/**
 * @function onImageRendered - When the image is rendered, check what tools can be rendered for this element.
 *
 * - First we get all tools which are active, passive or enabled on the element.
 * - If any of these tools have a `renderToolData` method, then we render them.
 * - Note that these tools don't necessarily have to be instances of  `BaseAnnotationTool`,
 *   Any tool may register a `renderToolData` method (e.g. a tool that displays an overlay).
 *
 * @param evt The normalized onImageRendered event.
 */
const onImageRendered = function (evt) {
  // TODO: should we do this on camera modified instead of image rendered?
  // e.g. no need to re-render annotations if only the VOI has changed
  triggerAnnotationRender(evt.detail.element)
}

const enable = function (element: HTMLElement) {
  element.addEventListener(
    RenderingEngineEvents.IMAGE_RENDERED,
    onImageRendered
  )
}

const disable = function (element: HTMLElement) {
  element.removeEventListener(
    RenderingEngineEvents.IMAGE_RENDERED,
    onImageRendered
  )
}

export default {
  enable,
  disable,
}