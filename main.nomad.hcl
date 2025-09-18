job "elysia-app" {
  datacenters = ["dc1"]
  type        = "service"

  group "web" {
    count = 1

    network {
      port "http" {
        static = 3000
        to     = 3000
      }
    }

    service {
      name = "elysia-app"
      port = "http"

      check {
        name     = "http-check"
        type     = "http"
        path     = "/health"
        interval = "10s"
        timeout  = "2s"
      }
    }

    task "app" {
      driver = "docker"

      config {
        image = "kusumaningrat16/bun-app:v4.2"
        ports = ["http"]
      }

      env {
        DATABASE_URL = "postgresql://postgres:password@postgres.service.consul:5432/file-explorer"
        NODE_ENV     = "production"
      }

      resources {
        cpu    = 500
        memory = 256
      }
    }
  }
}
