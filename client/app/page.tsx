import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <div className="contenido bg-gray-100 py-12">
      <main className="container mx-auto px-4">
        <article className="grid grid-cols-1 gap-8 ">
          <section className="flex justify-center min-w-96 max-w-[900px] px-6">
            <Carousel />
          </section>

          <section className="">
            <h3 className="text-2xl font-bold mb-4">Ubícanos</h3>
            <div className="embed-responsive aspect-w-16 aspect-h-96 min-w-96 max-w-[900px] px-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15773.448145668952!2d-75.88813780546091!3d8.751965683827335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fe4cc549dff%3A0x2d52d5ddbca62b1e!2sCENSA%20Monter%C3%ADa%20Sede%20A!5e0!3m2!1ses-419!2sco!4v1702124635313!5m2!1ses-419!2sco"
                width="100%" 
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
