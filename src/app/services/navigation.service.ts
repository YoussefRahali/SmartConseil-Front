import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  route?: string;
  action?: () => void;
  roles: string[];
  children?: NavigationItem[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigationItems: NavigationItem[] = [
    {
      id: 'dashboard-chef',
      title: 'Tableau de Bord',
      icon: 'ti ti-layout-dashboard',
      route: '/dashboard-chef',
      roles: ['chef departement']
    },
    {
      id: 'dashboard-enseignant',
      title: 'Tableau de Bord',
      icon: 'ti ti-layout-dashboard',
      route: '/dashboard-enseignant',
      roles: ['enseignant']
    },
    {
      id: 'dashboard-rapporteur',
      title: 'Tableau de Bord',
      icon: 'ti ti-layout-dashboard',
      route: '/dashboard-rapporteur',
      roles: ['rapporteur']
    },
    {
      id: 'dashboard-admin',
      title: 'Tableau de Bord',
      icon: 'ti ti-layout-dashboard',
      route: '/dashboard-admin',
      roles: ['admin']
    },
    {
      id: 'reports',
      title: 'Gestion des Rapports',
      icon: 'ti ti-file-text',
      route: '/report-management',
      roles: ['enseignant', 'chef departement', 'admin']
    },
    {
      id: 'rectifications',
      title: 'Rectifications',
      icon: 'ti ti-edit',
      route: '/rectification',
      roles: ['enseignant', 'admin']
    },
    {
      id: 'grade-correction',
      title: 'Correction de Notes',
      icon: 'ti ti-edit-circle',
      route: '/grade-correction',
      roles: ['enseignant']
    },
    {
      id: 'rectification-management',
      title: 'Gestion Rectifications',
      icon: 'ti ti-clipboard-check',
      route: '/rectification-management',
      roles: ['chef departement']
    },
    {
      id: 'users-chef',
      title: 'Gestion Utilisateurs',
      icon: 'ti ti-users',
      route: '/dashboard-chef',
      roles: ['chef departement']
    },
    {
      id: 'users-admin',
      title: 'Gestion Utilisateurs',
      icon: 'ti ti-users',
      route: '/dashboard-admin',
      roles: ['admin']
    },
    {
      id: 'statistics',
      title: 'Statistiques',
      icon: 'ti ti-chart-bar',
      route: '/dashboard-admin',
      roles: ['admin']
    },
    {
      id: 'profile',
      title: 'Mon Profil',
      icon: 'ti ti-user',
      route: '/profile',
      roles: ['enseignant', 'chef departement', 'rapporteur', 'admin']
    }
  ];

  constructor() { }

  /**
   * Get navigation items filtered by user role
   */
  getNavigationItems(userRole: string): NavigationItem[] {
    return this.navigationItems.filter(item => 
      item.roles.includes(userRole)
    );
  }

  /**
   * Get all navigation items (for admin)
   */
  getAllNavigationItems(): NavigationItem[] {
    return [...this.navigationItems];
  }

  /**
   * Get navigation item by ID
   */
  getNavigationItem(id: string): NavigationItem | undefined {
    return this.navigationItems.find(item => item.id === id);
  }

  /**
   * Check if user has access to a navigation item
   */
  hasAccess(item: NavigationItem, userRole: string): boolean {
    return item.roles.includes(userRole);
  }

  /**
   * Get dashboard route based on user role
   */
  getDashboardRoute(userRole: string): string {
    switch (userRole) {
      case 'enseignant':
        return '/dashboard-enseignant';
      case 'chef departement':
        return '/dashboard-chef';
      case 'rapporteur':
        return '/dashboard-rapporteur';
      case 'admin':
        return '/dashboard-admin';
      default:
        return '/dashboard';
    }
  }

  /**
   * Get role-specific menu items with custom logic
   */
  getRoleSpecificItems(userRole: string): NavigationItem[] {
    const baseItems = this.getNavigationItems(userRole);
    
    // Add role-specific customizations
    switch (userRole) {
      case 'admin':
        return [
          ...baseItems,
          {
            id: 'system-health',
            title: 'État du Système',
            icon: 'ti ti-heart',
            route: '/dashboard-admin',
            roles: ['admin']
          }
        ];
      
      case 'chef departement':
        return baseItems.map(item => {
          if (item.id === 'users-chef') {
            return {
              ...item,
              title: 'Gestion Équipe'
            };
          }
          return item;
        });
      
      default:
        return baseItems;
    }
  }
}
