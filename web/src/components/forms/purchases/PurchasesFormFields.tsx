import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { PurchaseFormDataType } from "@/types/FormDataTypes";
import { CommonSelect } from "../commons/Select";
import { useProducts } from "@/utils/queries/products";
import { useUnits } from "@/utils/queries/units";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  index: number;
  form: UseFormReturn<PurchaseFormDataType>;
  remove: UseFieldArrayRemove;
  edit: boolean;
};

export const PurchasesFormFields = ({ index, remove, form, edit }: Props) => {
  const formWatch = form.watch();
  const { data: ProductsData } = useProducts(formWatch.category);
  const { data: UnitsData } = useUnits();

  const getUnitAbbreviation = (id: string) =>
    UnitsData.units.find((unit) => unit.id.toString() === id)?.abbreviation ||
    "";

  return (
    <>
      {index === 0 ? (
        ""
      ) : (
        <span onClick={() => remove(index)} className="flex justify-end">
          <X className="h-4 w-4 cursor-pointer text-destructive" />
        </span>
      )}
      <FormField
        control={form.control}
        name={`purchases.${index}.product_id`}
        render={({ field }) =>
          edit ? (
            <>
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <Input disabled={edit} {...field} />
              </FormItem>
            </>
          ) : (
            <CommonSelect
              data={ProductsData.products.products}
              onChange={field.onChange}
              placeholder="Selecione o produto"
            />
          )
        }
      />
      {!edit && (
        <FormField
          control={form.control}
          name={`purchases.${index}.unit_id`}
          render={({ field }) => (
            <CommonSelect
              data={UnitsData.units}
              onChange={field.onChange}
              placeholder="Selecione o tipo de unidade"
            />
          )}
        />
      )}
      <div className="flex items-start gap-1">
        <FormField
          control={form.control}
          name={`purchases.${index}.quantity`}
          render={({ field }) => (
            <FormItem className="top-0 flex-1">
              {edit && <FormLabel>Quantidade</FormLabel>}
              <FormControl>
                <div className="relative">
                  <Input
                  disabled={edit}
                    placeholder="Quantidade"
                    className="text-sm"
                    {...field}
                  />
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 transform text-xs text-muted-foreground">
                    {edit
                      ? formWatch.purchases[0].unit_id
                      : getUnitAbbreviation(formWatch.purchases[index].unit_id)}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`purchases.${index}.value`}
          render={({ field }) => (
            <FormItem className="top-0 flex-1">
              {edit && <FormLabel>Valor</FormLabel>}
              <FormControl>
                <Input
                disabled={edit}
                  className=""
                  placeholder="Valor"
                  {...field}
                  value={edit ? formatCurrency(field.value) : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`purchases.${index}.supplier`}
        render={({ field }) => (
          <FormItem>
            {edit && <FormLabel>Fornecedor</FormLabel>}
            <FormControl>
              <Input disabled={edit} placeholder="Fornecedor" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`purchases.${index}.payment`}
        render={({ field }) => (
          edit ? (
            <>
              <FormItem>
                <FormLabel>Pagamento</FormLabel>
                <Input disabled={edit} {...field} />
              </FormItem>
            </>) : (
            <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={"cartao"}>Cartão</SelectItem>
                <SelectItem value={"dinheiro"}>Dinheiro</SelectItem>
                <SelectItem value={"outros"}>Outros</SelectItem>
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>)
          
        )}
      />
      <div className="m-auto my-1 w-2/3 border-t-2 border-dashed"></div>
    </>
  );
};
