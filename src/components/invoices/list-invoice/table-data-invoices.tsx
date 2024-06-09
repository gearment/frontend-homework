import { useEffect, useState } from "react";
import {
  TableDataInvoicesStyled,
  TableTitleControl,
  TableStyled,
  ExportControlStyled,
  TableContentStyled
} from "./styled";
import { IInvoices } from "interfaces/invoices";
import { useCommonStore } from "stores/common.store";
import { deepCompare } from "helpers/common";
import CheckBtnCustom from "components/control-style/checkbox";
import {
  CheckOutlined,
  DownloadOutlined,
  EyeOutlined,
  FilePdfOutlined,
  MailOutlined,
  PrinterOutlined,
  SortAscendingOutlined
} from "@ant-design/icons";
import { HTML_ELEMENTS } from "constants/common";

interface IInvoiceRow {
  invoice: IInvoices;
}

const InvoiceRow = ({ invoice }: IInvoiceRow) => {
  return (
    <TableStyled.TR>
      <TableStyled.TD>
        <CheckBtnCustom
          isOn={false}
          onChange={(checked) => console.log("####checked", checked)}
        />
      </TableStyled.TD>
      <TableStyled.TD>{invoice.id}</TableStyled.TD>
      <TableStyled.TD>{invoice.builledTo}</TableStyled.TD>
      <TableStyled.TD>invoice.invoiceDate</TableStyled.TD>
      <TableStyled.TD>{invoice.status}</TableStyled.TD>
      <TableStyled.TD>
        {invoice.VAT === true && (
          <CheckOutlined className={HTML_ELEMENTS.CLASS.FILL_ICON_STYLE} />
        )}
      </TableStyled.TD>
      <TableStyled.TD>
        <ExportControlStyled>
          <DownloadOutlined
            className={`${HTML_ELEMENTS.CLASS.FILL_ICON_STYLE} ${HTML_ELEMENTS.CLASS.POINTER_CURSOR}`}
          />
          <FilePdfOutlined
            className={`${HTML_ELEMENTS.CLASS.FILL_ICON_STYLE} ${HTML_ELEMENTS.CLASS.POINTER_CURSOR}`}
          />
          <PrinterOutlined
            className={`${HTML_ELEMENTS.CLASS.FILL_ICON_STYLE} ${HTML_ELEMENTS.CLASS.POINTER_CURSOR}`}
          />
          <MailOutlined
            className={`${HTML_ELEMENTS.CLASS.FILL_ICON_STYLE} ${HTML_ELEMENTS.CLASS.POINTER_CURSOR}`}
          />
          <EyeOutlined
            className={`${HTML_ELEMENTS.CLASS.FILL_ICON_STYLE} ${HTML_ELEMENTS.CLASS.POINTER_CURSOR}`}
          />
        </ExportControlStyled>
      </TableStyled.TD>
    </TableStyled.TR>
  );
};

const TableDataInvoices = () => {
  const { invoices: invoiceStore } = useCommonStore();
  const [invoices, setInvoices] = useState<IInvoices[]>();

  useEffect(() => {
    if (invoiceStore && !deepCompare(invoiceStore, invoices)) {
      setInvoices(invoiceStore);
    }
  }, [invoiceStore, invoices]);

  return (
    <TableDataInvoicesStyled.CONTAINER>
      <TableStyled.TABLE>
        <TableStyled.THEAD>
          <TableStyled.TR>
            <TableStyled.TH>
              <CheckBtnCustom
                isOn={false}
                onChange={(checked) => console.log("####checked", checked)}
              />
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>
                <div>Invoice ID</div>
                <SortAscendingOutlined />
              </TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>
                <div>Billed to</div>
                <SortAscendingOutlined />
              </TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>
                <div>Invoice Date</div>
                <SortAscendingOutlined />
              </TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>
                <div>Status</div>
                <SortAscendingOutlined />
              </TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>
                <div>VAT</div>
                <SortAscendingOutlined />
              </TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>
                <div>Export</div>
                <SortAscendingOutlined />
              </TableTitleControl>
            </TableStyled.TH>
          </TableStyled.TR>
        </TableStyled.THEAD>
        <tbody>
          {invoices ? (
            invoices?.map((invoice) => (
              <InvoiceRow invoice={invoice} key={invoice.id} />
            ))
          ) : (
            <div>Empty data</div>
          )}
        </tbody>
      </TableStyled.TABLE>
    </TableDataInvoicesStyled.CONTAINER>
  );
};

export { TableDataInvoices, InvoiceRow };
