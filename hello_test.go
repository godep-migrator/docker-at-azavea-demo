package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-martini/martini"
)

func App(path string, handler func(martini.Params) string) *martini.ClassicMartini {
	m := martini.Classic()
	m.Get(path, handler)

	return m
}

func Test_Root(t *testing.T) {
	m := App("/", HelloWorld)

	request, _ := http.NewRequest("GET", "/", nil)
	recorder := httptest.NewRecorder()

	m.ServeHTTP(recorder, request)

	if recorder.Body.String() != "<h1>Hello, world!</h1>" {
		t.Errorf("Not the expected body for /.")
	}
}

func Test_Name(t *testing.T) {
	m := App("/:name", HelloName)

	request, _ := http.NewRequest("GET", "/joker", nil)
	recorder := httptest.NewRecorder()

	m.ServeHTTP(recorder, request)

	if recorder.Body.String() != "<h1>Hello, joker!</h1>" {
		t.Errorf("Not the expected body for /joker.")
	}
}
