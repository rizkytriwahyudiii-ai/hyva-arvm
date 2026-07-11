import { UseProductsReturn } from '@/lib/admin/useProducts';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

interface CatalogTabProps {
  productsHook: UseProductsReturn;
}

/** Tab "Manajemen Katalog Produk" — form di kiri, tabel produk di kanan */
export default function CatalogTab({ productsHook }: CatalogTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <ProductForm productsHook={productsHook} />
      <div className="lg:col-span-2">
        <ProductTable productsHook={productsHook} />
      </div>
    </div>
  );
}