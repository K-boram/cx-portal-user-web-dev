/* eslint-disable prefer-promise-reject-errors */
import mitt from 'mitt'

const flags: Record<string, boolean> = {}
export const EventBus = mitt()
function eventCalledCheck(events: string[]): boolean {
  return events.every(event => flags[event])
}

function onceEventAdapter(event: string): Promise<void> {
  return new Promise((resolve) => {
    EventBus.on(event, () => {
      EventBus.off(event)
      resolve()
    })
  })
}

export const EventHandler = (function () {
  return {
    emit(event: string): void {
      flags[event] = true
      EventBus.emit(event)
    },
    once(...events: string[]): Promise<void> {
      return new Promise((resolve, reject) => {
        if (events.length === 0)
          reject()
        if (eventCalledCheck(events)) {
          resolve();
          (async () => {
            for (const event of events) {
              if (!flags[event])
                await onceEventAdapter(event)
            }
            resolve()
          })()
        }
      })
    },
  }
})()
