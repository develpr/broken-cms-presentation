<?php


class ApiConnector{

    protected $version = 'v1';

    /** @var \Illuminate\Http\JsonResponse $response */
    protected $response;

    protected $statusCode;

    public function dispatchRequest($request)
    {
        $originalInput = Request::input();
        Request::replace($request->input());
        $response = Route::dispatch($request);
        Request::replace($originalInput);

        $this->response = $response;

        return $this;
    }

    public function getStatusCode()
    {
        return $this->getResponse()->getStatusCode();
    }

    public function get($endpoint)
    {
        $request = Request::create($endpoint);
        $this->dispatchRequest($request);

        return $this->getContent();
    }

    public function destroy($endpoint)
    {

    }

    public function getResponse()
    {
        return $this->response;
    }

    public function getContent()
    {
        return json_decode($this->response->getContent());
    }

}