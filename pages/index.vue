<template>
  <div>
    <div class="-mt-5 pt-5" id="übermich">
      <div class="card">
        <div class="text-3xl">Über mich</div>
        <div class="text-lg">
          Ich bin Linus, ein Full-Stack Developer, aus dem Münsterland.<br>
          Aktuell besuche ich ein Berufskolleg für Technik und Gestaltung, bei dem ich dieses Jahr mein Abitur abschließen werde.<br>
          Ich programmiere hobbymäßig bereits seit ~9 Jahren und bin seit März 2018 beruflich in diesem Bereich tätig.<br>
          Zuerst auf MiniJob Basis, seit November 2019 aber auf Freiberuflicher Basis.<br>
        </div>
      </div>
    </div>
    <div class="card mt-2">
      <div class="text-3xl">Technologien</div>
      <div class="text-gray-600 text-base">Mit diesen Technologien arbeite ich</div>

      <div class="flex flex-wrap text-xl font-semibold -m-3 mt-2 mb-2" id="technologies">
        <div>
          <div>HTML</div>
          <div>
            <a href="https://www.php.net" target="_blank">PHP</a>
            <div class="sub">
              <div><a href="https://laravel.com" target="_blank">Laravel</a></div>
              <div><a href="https://symfony.com" target="_blank">Symfony</a></div>
            </div>
          </div>
          <div>
            JS
            <div class="sub">
              <div><a href="https://vuejs.org" target="_blank">Vue.js</a></div>
              <div><a href="https://nuxtjs.org" target="_blank">Nuxt.js</a></div>
              <div><a href="https://jquery.com" target="_blank">jQuery</a></div>
            </div>
          </div>
          <div>CSS
            <div class="sub">
              <div><a href="https://tailwindcss.com" target="_blank">tailwindcss</a></div>
              <div><a href="https://getbootstrap.com" target="_blank">Bootstrap</a></div>
              <div><a href="https://getuikit.com" target="_blank">UIkit</a></div>
            </div>
          </div>
          <div><a href="https://wordpress.org" target="_blank">WordPress</a></div>
        </div>
        <div>
          <div>
            Datenbanken
            <div class="sub">
              <div><a href="https://mariadb.org" target="_blank">MariaDB</a></div>
              <div><a href="https://www.mysql.com" target="_blank">MySQL</a></div>
              <div><a href="https://www.sqlite.org" target="_blank">SQLite</a></div>
              <div>SQL Server</div>
            </div>
          </div>
          <div>
            <a href="https://www.python.org" target="_blank">Python</a>
            <div class="sub">
              <div><a href="https://www.djangoproject.com" target="_blank">django</a></div>
              <div><a href="https://palletsprojects.com/p/flask/" target="_blank">Flask</a></div>
              <div><a href="https://pandas.pydata.org" target="_blank">pandas</a></div>
            </div>
          </div>
          <div>
            C++
          </div>
          <div>
            C#
          </div>
          <div>
            Java
          </div>
        </div>
        <div>
          <div>
            Git
          </div>
          <div>
            Deployment
            <div class="sub">
              <div><a href="https://www.terraform.io" target="_blank">Terraform</a></div>
              <div><a href="https://www.ansible.com" target="_blank">Ansible</a></div>
            </div>
          </div>
          <div>
            Betriebssysteme
            <div class="sub">
              <div>Windows Server</div>
              <div><a href="https://www.debian.org" target="_blank">Debian</a></div>
              <div><a href="https://ubuntu.com" target="_blank">Ubuntu</a></div>
              <div><a href="https://www.centos.org" target="_blank">CentOS</a></div>
              <div><a href="https://www.archlinux.org" target="_blank">Arch Linux</a></div>
              <div><a href="https://www.freebsd.org" target="_blank">FreeBSD</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5" id="projekte">
      <div class="card mt-5">
        <div class="text-3xl">Projekte</div>
        <div class="text-gray-600">Meine bisherigen Projekte</div>
      </div>
    </div>
    <div class="card mt-2">
      <div class="text-xl">CHI - COSTA DEL SOL</div>
      <div class="text-gray-600 mb-1">März 2018 - <i>heute</i></div>
      <div>
        CHI - COSTA DEL SOL ist die Webpräsenz eines spanischen Immobilienmarklers an der Costa del sol.<br>
      </div>
      <nuxt-link to="/projekte/chi-costadelsol" class="gray-btn">Details</nuxt-link>
    </div>
    <div class="card mt-2">
      <div class="text-xl">mysql-exporter</div>
      <div class="text-gray-600 mb-1">Januar 2020</div>
      <div>
        Gefragt war ein Tool, welches eine Entfernte MySQL Datenbank<br>datenschutzgerecht zu dumpen und lokal zu importieren.
      </div>
      <nuxt-link to="/projekte/mysql-exporter" class="gray-btn">Details</nuxt-link>
    </div>
    <div class="card mt-2">
      <div class="text-xl">FtpToGit</div>
      <div class="text-gray-600 mb-1">Dezember 2019</div>
      <div>
        Es wurde ein Tool angefragt, welches einen Ordner auf einem entfernten FTP/SFTP Server herunterlädt<br>
        und dieses in eine vorher festgelegte Branch in einem Git Repository hochlädt.
      </div>
      <nuxt-link to="/projekte/ftptogit" class="gray-btn">Details</nuxt-link>
    </div>
    <div class="card mt-2">
      <div class="text-xl">pruefstellen.de</div>
      <div class="text-gray-600 mb-1">April 2018 - September 2019</div>
      <div>
        Prüfstellen ist eine Platform, auf der Prüfstellen ihre Dienste anbieten können und Kunden diese Inserate<br>
        durch ein angenehmes Interface finden können.
      </div>
      <nuxt-link to="/projekte/pruefstellen" class="gray-btn">Details</nuxt-link>
    </div>
  </div>
</template>

<style lang="css" scoped>

  .sub {
    @apply font-normal ml-4 text-lg;
  }

  #technologies > div {
    @apply px-3 w-auto;
  }

  #technologies a {
    @apply underline;
  }
</style>

<style>
.gray-btn {
  @apply bg-gray-800 shadow text-white font-bold py-1 px-4 rounded text-lg mt-4 inline-block;
}

.gray-btn:hover {
  @apply bg-black shadow-lg;
}

.card {
  @apply shadow bg-white p-5;
}
</style>