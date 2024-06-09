import CheckBtnCustom from "components/control-style/checkbox";
import { CreateInvoiceDraftWrapper, TableStyled } from "./styled";
import { TableTitleControl } from "../list-invoice/styled";
import { useCommonStore } from "stores/common.store";
import { IDraftInvoice } from "interfaces/invoices";
import { ICreateInvoiceDraft } from "./interface";

interface IDraftInvoiceRow {
  draftInvoice: IDraftInvoice;
  handleActiveDraft: (id: string, checked: boolean) => void;
}

const DraftInvoiceRow = ({
  draftInvoice,
  handleActiveDraft
}: IDraftInvoiceRow) => {
  return (
    <TableStyled.TR>
      <TableStyled.TD>
        <CheckBtnCustom
          isOn={false}
          onChange={(checked) => handleActiveDraft(draftInvoice.id, checked)}
        />
      </TableStyled.TD>
      <TableStyled.TD>{draftInvoice.documentNumber}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.documentType}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.prepared}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.contractor}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.format}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.bankAccount}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.invoiceDate}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.dueDate}</TableStyled.TD>
      <TableStyled.TD>{draftInvoice.payment}</TableStyled.TD>
    </TableStyled.TR>
  );
};

const CreateInvoiceDraft = ({ handleActiveDraft }: ICreateInvoiceDraft) => {
  const { draftInvoices } = useCommonStore();
  return (
    <CreateInvoiceDraftWrapper>
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
              <TableTitleControl>Document number</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Document type</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Prepared</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Contractor</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Format</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Bank account</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Invoice date</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Due date</TableTitleControl>
            </TableStyled.TH>
            <TableStyled.TH>
              <TableTitleControl>Payment</TableTitleControl>
            </TableStyled.TH>
          </TableStyled.TR>
        </TableStyled.THEAD>
        <tbody>
          {draftInvoices ? (
            draftInvoices?.map((draftInvoice) => (
              <DraftInvoiceRow
                draftInvoice={draftInvoice}
                handleActiveDraft={handleActiveDraft}
                key={draftInvoice.id}
              />
            ))
          ) : (
            <TableStyled.TR>
              <TableStyled.TD>Empty data</TableStyled.TD>
            </TableStyled.TR>
          )}
        </tbody>
      </TableStyled.TABLE>
    </CreateInvoiceDraftWrapper>
  );
};

export default CreateInvoiceDraft;
