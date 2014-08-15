package main

import (
	"fmt"

	"github.com/go-martini/martini"
)

func main() {
	server := martini.Classic()

	server.Get("/", HelloWorld)
	server.Get("/:name", HelloName)

	server.Run()
}

func HelloWorld(args martini.Params) string {
	return "<h1>Hello, world!</h1>"
}

func HelloName(args martini.Params) string {
	return fmt.Sprintf("<h1>Hello, %s!</h1>", args["name"])
}
