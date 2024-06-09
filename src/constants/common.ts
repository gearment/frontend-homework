import { IInvoiceTags, ISidebarGroup } from "interfaces/invoices";
import { ReactComponent as HomeIcon } from "assets/icons/home-icon.svg";
import { ReactComponent as Invoices } from "assets/icons/invoices-icon.svg";
import { ReactComponent as PageAddIcon } from "assets/icons/page-add-icon.svg";
import { ReactComponent as DraftIcon } from "assets/icons/draft-icon.svg";
import { ReactComponent as PersonIcon } from "assets/icons/person-icon.svg";
import { ReactComponent as DatabaseIcon } from "assets/icons/database-icon.svg";
import { ReactComponent as UsersIcon } from "assets/icons/users-icon.svg";
import { ReactComponent as StatisticsIcon } from "assets/icons/statistics-icon.svg";
import { InvoiceAllConfig } from "components/invoices/list-invoice/config";

export const HTML_ELEMENTS = {
  CLASS: {
    GLOBAL_LOADING: "global-loading",
    FILL_ICON_STYLE: "fill-icon-style",
    POINTER_CURSOR: "pointer-cursor",
    INPUT_CUSTOM: "input-custom",
    PLACE_HOLDER_CUSTOM_CLASS: "placeholder-custom-class"
  },
  DATA_ATTRIBUTE: {},
  ID: {
    GLOBAL_LOADING: "global-loading"
  }
} as const;

export enum NavItemEnum {
  CREATE_NEW_INVOICE = "create-new-invoice",
  LIST_INVOICE = "list-invoice",
  HOME = "home",
  DRAFT = "draft"
}

export const SIDEBAR_TITLE = "Microinvoice";

export const SIDEBAR_GROUP = {
  RECENT: "Recent",
  OTHERS: "Others"
};

export const SIDEBAR_LIST: ISidebarGroup[] = [
  {
    group: SIDEBAR_GROUP.RECENT,
    items: [
      {
        id: "home",
        icon: HomeIcon,
        title: "Home"
      },
      {
        id: "invoices",
        icon: Invoices,
        title: "Invoices",
        selectTab: NavItemEnum.LIST_INVOICE,
        items: [
          {
            id: "create-new",
            icon: PageAddIcon,
            selectTab: NavItemEnum.CREATE_NEW_INVOICE,
            title: "Create new"
          },
          {
            id: "drafts",
            icon: DraftIcon,
            selectTab: NavItemEnum.DRAFT,
            title: "Draft"
          }
        ]
      },
      {
        id: "contractors",
        icon: PersonIcon,
        title: "Contractors"
      },
      {
        id: "products",
        icon: DatabaseIcon,
        title: "Products and Services"
      }
    ]
  },
  {
    group: SIDEBAR_GROUP.OTHERS,
    items: [
      {
        id: "users",
        icon: UsersIcon,
        title: "Users"
      },
      {
        id: "statistics",
        icon: StatisticsIcon,
        title: "statistics"
      }
    ]
  }
];

export const INVOICE_TAGS: IInvoiceTags[] = [
  {
    key: "all",
    name: "All",
    fieldsConfig: InvoiceAllConfig
  },
  {
    key: "edit",
    name: "Edit"
  },
  {
    key: "inprogress",
    name: "Inprogress"
  },
  {
    key: "draft",
    name: "Draft"
  }
];

export const RETRY_OPTIONS = { times: 3, delay: 300 };

export const USER_STATUS_CODE = {
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};

export const REACT_APP_DOMAIN_API = process.env.REACT_APP_DOMAIN_API;
