export interface Tab {
  id: number
  title: string
}

export interface TabNavigationProps {
  tabs: Tab[]
  activeTab: number
  onTabChange: (tabId: number) => void
}

export interface TabItem {
  title: string
  description: string
}

export interface TabData {
  id: string
  title: string
  subtitle?: string
  visualType: string
  items: TabItem[]
  buttonText: string
  displayName?: string // Optional field for explicit tab display name
}

export interface TabContentProps {
  tabData: TabData
}

export interface CarouselContentProps {
  title: string
  subtitle?: string
  items: TabItem[]
  buttonText: string
}
