import type { App } from 'vue'

import { FilesPanel } from '@/views/store/StorePanel/components/FilesPanel'
import { ProjectPanel } from '@/views/store/StorePanel/components/ProjectPanel'
import { SearchPanel } from '@/views/store/StorePanel/components/SearchPanel'


export function setupComponents(app: App<Element>) {
    app.component('FilesPanel', FilesPanel)
    app.component('ProjectPanel', ProjectPanel)
    app.component('SearchPanel', SearchPanel)
  }
  
