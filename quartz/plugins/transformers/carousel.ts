import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit";

// @ts-ignore
import carouselScript from "../../components/scripts/carousel.inline"
import carouselStyle from "../../components/styles/carousel.inline.scss"

interface CarouselOptions {
  showDots: boolean
}

export const Carousel: QuartzTransformerPlugin<Partial<CarouselOptions>> = (opts) => {
    const showDots = opts?.showDots ?? true

    function carouselTransformer() {
        return (tree: any) => {
            visit(tree, 'html', (node: any) => {
                // Check if the node contains a carousel tag
                const content = node.value as string
                if (content.startsWith('<carousel>') && content.endsWith('</carousel>')) {
                // Extract the content inside the carousel tag
                const innerContent = content.slice('<carousel>'.length, -'</carousel>'.length).trim()
                  // Process images correctly by using a more reliable approach
                const processedContent = innerContent.split('<img').map((part, index) => {
                    if (index === 0) return ''; // Skip the first part before any img tag
                    
                    // Extract alt text from the image tag
                    const altMatch = part.match(/alt="([^"]*)"/)
                    const altText = altMatch ? altMatch[1] : ''
                    
                    return `<div class="quartz-carousel-slide">
                        <img${part}
                        ${altText ? `<div class="quartz-carousel-caption">${altText}</div>` : ''}
                    </div>`;
                }).join('');
                
                // Replace the node with a div that has a carousel class
                node.type = 'html'
                node.value = `<div class="quartz-carousel" data-needs-init="true">
                <div class="quartz-carousel-slides">
                    ${processedContent}
                </div>
                ${showDots ? '<div class="quartz-carousel-dots"></div>' : ''}
                <button class="quartz-carousel-prev" aria-label="Previous slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                </button>
                <button class="quartz-carousel-next" aria-label="Next slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                </button>
                </div>`
                }
            })
        }
    }

    return {
        name: "Carousel",
        markdownPlugins() {
            return [carouselTransformer]
        },
        externalResources() {
            return {
                css: [{ 
                    content: carouselStyle,
                    inline: true
                }],
                js: [{
                    script: carouselScript,
                    loadTime: "afterDOMReady",
                    contentType: "inline",
                }],
            }
        },
    }
}