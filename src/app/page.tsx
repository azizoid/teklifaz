import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Suspense } from "react";

const Home = async () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <article className="md:col-span-3 space-y-6">
          <section>
            <p className="leading-relaxed">
              <strong>Təklif.az</strong> – Azərbaycan texnoloji ekosistemini
              gücləndirməyi hədəfləyən, yerli proqramçıların GitHub layihələrini
              bir araya gətirən unikal platformadır. Burada sən öz layihəni
              paylaşaraq onun daha geniş kütləyə çatmasını təmin edə, rəylər
              toplaya və gələcək əməkdaşlıqlara qapı aça bilərsən.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Niyə Təklif.az?</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Görünürlük və Tanıtım:</strong>
                Layihən buradakı kataloqa əlavə olunduqda, digər mütəxəssislər
                və potensial tərəfdaşlar tərəfindən kəşf edilir.
              </li>
              <li>
                <strong>Fikir Mübadiləsi:</strong>
                Təcrübəli developerlərin fikirlərini öyrənərək layihəni daha da
                mükəmməlləşdirmək fürsəti.
              </li>
              <li>
                <strong>İcma Dəstəyi:</strong>
                Oxşar ideyalı insanlarla tanış olmaq, birgə işləmək və daha
                güclü, daha çevik komandalar formalaşdırmaq.
              </li>
              <li>
                <strong>İnkişaf Perspektivi:</strong>
                Sənaye üzrə mütəxəssislər, həvəskarlar və investorlar arasında
                görünürlüyünü artıraraq layihənin potensialını daha geniş
                miqyasda nümayiş etdirmək.
              </li>
            </ul>
          </section>

          <section>
            <p className="leading-relaxed">
              Bu platforma təkcə layihələrin nümayiş olunduğu bir məkan deyil,
              həm də gələcəkdə innovativ ideyaları birləşdirərək,
              azərbaycanlıların daha güclü və dinamik bir IT icması
              formalaşdırmağı hədəfləyir.
            </p>
            <p className="font-semibold mt-4">
              Sən də qoşul və icmamızı böyüt!
            </p>
          </section>
        </article>

        <aside className="md:col-span-2 space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Sidebar />
          </Suspense>
        </aside>
      </div>
    </>
  );
};

export default Home;
